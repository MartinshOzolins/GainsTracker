//components
import WorkoutForm from "../components/WorkoutForm";
import ConfirmationEmailMessage from "../components/ConfirmationEmailMessage";

// react hooks
import { useContext, useEffect, useState } from "react";

//global context
import { GlobalDataContext } from "../context/globalDataContext.js";

export default function Home() {
  const { currentUser } = useContext(GlobalDataContext);
  useEffect(() => {
    if (currentUser && currentUser.user_metadata.email_verified === false) {
      setConfirmEmailMessage(true);
    }
  }, [currentUser]);
  // message for user's without email verification
  const [confirmEmailMessage, setConfirmEmailMessage] = useState(false);

  return (
    <div className="w-full h-full flex flex-col items-center pt-2">
      {!currentUser ? (
        <p className="text-md sm:text-lg text-center py-3">
          Start tracking your workout progress{" "}
          <span className="font-semibold">TODAY</span>
        </p>
      ) : (
        <p className="text-lg md:text-2xl">Add a new Workout Session</p>
      )}
      <WorkoutForm />
      <ConfirmationEmailMessage
        isVisible={confirmEmailMessage}
        setConfirmEmailMessage={setConfirmEmailMessage}
      />
    </div>
  );
}
