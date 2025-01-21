import { useContext, useEffect, useState } from "react";
import { useSendPasswordResetRequest } from "../hooks/userHooks/useUser";
import CircularProgress from "@mui/material/CircularProgress";
import { GlobalDataContext } from "../context/globalDataContext.js";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { currentUser } = useContext(GlobalDataContext);
  const { mutateAsync: sendPasswordResetRequest } =
    useSendPasswordResetRequest();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timeoutSeconds, setTimeoutSeconds] = useState(120);

  const handleSendPasswordReset = async () => {
    setIsLoading(true);
    setIsError(false);
    setIsButtonDisabled(true);
    setTimeoutSeconds(120);
    try {
      const { error } = await sendPasswordResetRequest({
        email: currentUser.email,
      });
      if (error) setIsError(true);
      else setIsSuccess(true);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/authentication");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    let interval;
    if (isButtonDisabled) {
      interval = setInterval(() => {
        setTimeoutSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsButtonDisabled(false);
            setIsSuccess(false);
            setIsLoading(false);
            setIsError(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isButtonDisabled]);

  return (
    <>
      {currentUser ? (
        <div className="h-full w-full flex flex-col items-center justify-start bg-gray-50 pt-8">
          <div className="relative w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
            <img
              src="default-images/default-user-image.png"
              alt="Profile"
              className="absolute"
            />
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-500">{currentUser.email}</p>
            {isButtonDisabled ? (
              <p>Email sent, try again in {timeoutSeconds} seconds</p>
            ) : (
              <>
                <p>Need to reset your password?</p>
                <p>Send a password reset request to your email</p>
              </>
            )}
            <button
              onClick={handleSendPasswordReset}
              className="mt-2 text-blue-500 hover:underline"
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? `Please wait` : "Send Request"}
            </button>
            <p className="mt-4 text-gray-700">
              {isLoading && "Sending password reset request..."}
              {isError && `Error occurred: try again!`}
              {isSuccess && "Password reset email sent successfully!"}
            </p>
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen flex justify-center items-start pt-20">
          <CircularProgress />
        </div>
      )}
    </>
  );
}
