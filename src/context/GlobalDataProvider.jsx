import { useState } from "react";
import globalDataContext from "./GlobalDataContext";

export default function GlobalDataProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(undefined);

  // current workout info
  const [workoutDate, setWorkoutDate] = useState("");
  const [workoutName, setWorkoutName] = useState("");
  // current workout info about exercises added
  const [currentWorkoutDetails, setCurrentWorkoutDetails] = useState([]);

  return (
    <globalDataContext.Provider
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
    </globalDataContext.Provider>
  );
}
