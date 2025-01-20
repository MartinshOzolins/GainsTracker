import { useContext, useState } from "react";

//context
import { GlobalDataContext } from "../context/globalDataContext";

export default function NonWeightExerciseForm() {
  const { setCurrentWorkoutDetails } = useContext(GlobalDataContext);

  //local error and loading states
  const [inputError, setInputError] = useState("");
  const [loading, setLoading] = useState(false);

  //non-weight exercise states
  const [nonWeightExerciseDetails, setNonWeightExerciseDetails] = useState({
    exercise: "",
    duration: "",
    distance: "",
  });

  const handleAddNonWeightExerciseToWorkout = () => {
    const { exercise, duration, distance } = nonWeightExerciseDetails;
    if (!exercise) {
      setInputError("Please enter an exercise name.");
      return;
    }
    const numericDuration = Number(duration);
    const numericDistance = Number(distance);
    if (
      (numericDuration && numericDuration <= 0) ||
      (numericDistance && numericDistance <= 0) ||
      (!numericDuration && !numericDistance)
    ) {
      setInputError(
        "At least one of duration or distance must be greater than zero."
      );
      return;
    }
    setInputError("");
    setLoading(true);
    //{workout_id, user_id, exercise, duration, distance}
    const newNonWeightExerciseDetails = {
      type: "nonWeight",
      data: {
        exercise: exercise.trim().toLowerCase(),
        duration: numericDuration || null,
        distance: numericDistance || null,
      },
    };
    setCurrentWorkoutDetails((prev) => [...prev, newNonWeightExerciseDetails]);
    setNonWeightExerciseDetails({
      exercise: "",
      duration: "",
      distance: "",
    });
    setLoading(false);
  };

  return (
    <div className="p-6 shadow-md rounded-md bg-gray-100">
      {inputError.length > 0 && <p className="text-red-500">{inputError}</p>}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-center ">
          Non-Weight Exercise
        </h2>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm md:text-base"
          onClick={handleAddNonWeightExerciseToWorkout}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add to Workout"}
        </button>
      </div>
      <hr className="mb-4 border-gray-300" />
      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="exercise"
          value={nonWeightExerciseDetails.exercise}
          placeholder="Exercise (e.g. treadmill)"
          onChange={(e) => {
            const { name, value } = e.target;
            setNonWeightExerciseDetails((prev) => ({
              ...prev,
              [name]: value,
            }));
          }}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          min="0.1"
          step="0.1"
          name="duration"
          value={nonWeightExerciseDetails.duration}
          placeholder="Duration (in mins)"
          onChange={(e) => {
            const { name, value } = e.target;
            setNonWeightExerciseDetails((prev) => ({
              ...prev,
              [name]: value,
            }));
          }}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="distance"
          min="0.1"
          step="0.1"
          value={nonWeightExerciseDetails.distance}
          placeholder="Distance (in km)"
          onChange={(e) => {
            const { name, value } = e.target;
            setNonWeightExerciseDetails((prev) => ({
              ...prev,
              [name]: value,
            }));
          }}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
