import { useContext, useEffect, useState } from "react";
import { usePasswordReset } from "../hooks/userHooks/useUser";
import { useNavigate } from "react-router-dom";
import globalDataContext from "../context/GlobalDataContext.js";
import supabase from "../supabase";
export default function ResetPasswordPage() {
  const { currentUser, setCurrentUser } = useContext(globalDataContext);

  const { mutateAsync: resetPassword } = usePasswordReset();
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  // Local states for UI
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [isSuccess, setIsSuccess] = useState("");

  // navigation
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      const checkAuthenticatedUser = async () => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (user) {
            setCurrentUser(user);
          } else {
            navigate("/authentication");
          }
        } catch (error) {
          console.error("Error checking user:", error.message);
        }
      };
      checkAuthenticatedUser();
    }
  }, [currentUser, navigate, setCurrentUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== repeatPassword) {
      setIsError("Passwords do not match!");
      return;
    }
    setIsLoading(true);
    setIsError("");
    try {
      const { error } = await resetPassword({ new_password: newPassword });
      if (error) {
        setIsError(error?.message || error);
        return;
      }
      setIsSuccess("Password successfully changed");
      navigate("/");
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!currentUser ? null : (
        <div className="flex flex-col items-center w-full max-w-sm mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
          <h1 className="font-semibold text-xl mb-6 text-gray-800">
            Reset Password
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 w-full"
          >
            <div className="flex flex-col">
              <label
                htmlFor="firstPassword"
                className="text-gray-700 font-medium mb-2"
              >
                New Password
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="firstPassword"
                type="password"
                placeholder="Enter your new password"
                onChange={({ target: { value } }) => setNewPassword(value)}
                value={newPassword}
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="secondPassword"
                className="text-gray-700 font-medium mb-2"
              >
                Repeat Password
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="secondPassword"
                type="password"
                placeholder="Repeat your new password"
                onChange={({ target: { value } }) => setRepeatPassword(value)}
                value={repeatPassword}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-4 py-2 rounded-md text-white ${
                isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200`}
            >
              {!isLoading ? "Reset Password" : "Processing..."}
            </button>

            {isError.length > 0 && (
              <p className="text-red-500 text-sm">{isError}</p>
            )}
            {isSuccess.length > 0 && (
              <p className="text-green-500 text-sm">{isSuccess}</p>
            )}
          </form>
        </div>
      )}
    </>
  );
}
