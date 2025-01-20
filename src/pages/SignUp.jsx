import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import supabase from "../supabase";
import { useUserSignUp, useUserSignIn } from "../hooks/userHooks/useUser";
import { GlobalDataContext } from "../context/globalDataContext";

export default function SignUp() {
  const { currentUser, setCurrentUser } = useContext(GlobalDataContext);

  //local states
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSignUp, setIsSignUp] = useState(false);
  const [inputError, setInputError] = useState("");
  const [loading, setLoading] = useState(false);

  //custom hooks and navigation
  const navigate = useNavigate();
  const { mutateAsync: signUpUser } = useUserSignUp();
  const { mutateAsync: signInUser } = useUserSignIn();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    //email check
    if (!email) {
      setInputError("Email is required.");
      return;
    }
    // password check
    if (password.length < 6) {
      setInputError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setInputError("");

    try {
      if (isSignUp) {
        const response = await signUpUser({ email, password });
        if (response.data.user) {
          setCurrentUser(response.data.user);
          navigate("/");
        } else {
          setInputError(
            `Authentication failed. ${response.error?.message || null}`
          );
        }
      } else {
        const response = await signInUser({ email, password });
        if (response.data.user) {
          setCurrentUser(response.data.user);
          navigate("/");
        } else {
          setInputError(
            `Authentication failed. ${response.error?.message || null}`
          );
        }
      }
    } catch (error) {
      setInputError(`Authentication failed. ${error?.message || null}`);
    } finally {
      setLoading(false);
    }
    setFormData({ email: "", password: "" });
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        {inputError && (
          <p className="text-red-500 text-center" aria-live="polite">
            {inputError}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, [e.target.id]: e.target.value });
              }}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, [e.target.id]: e.target.value });
              }}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-500 hover:underline"
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
