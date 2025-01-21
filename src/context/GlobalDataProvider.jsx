import { useState } from "react";
import { GlobalDataContext } from "./globalDataContext.js";

export default function GlobalDataProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(undefined);

  // current workout info
  const [workoutDate, setWorkoutDate] = useState("");
  const [workoutName, setWorkoutName] = useState("");
  // current workout info about exercises added
  const [currentWorkoutDetails, setCurrentWorkoutDetails] = useState([]);

  return (
    <GlobalDataContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        workoutDate,
        setWorkoutDate,
        workoutName,
        setWorkoutName,
        currentWorkoutDetails,
        setCurrentWorkoutDetails,
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
}
