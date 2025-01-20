import { useContext, useState } from "react";

//components
import WeightExerciseForm from "../components/WeightExerciseForm";
import NonWeightExerciseForm from "../components/NonWeightExerciseForm";
import NewWorkoutExerciseInfo from "./NewWorkoutExerciseInfo";

//global context
import { GlobalDataContext } from "../context/globalDataContext";

// custom hooks for db interaction
import {
  useAddNewWorkout,
  useAddNewNonWeightExercise,
  useAddNewWeightExerciseSet,
  useAddNewWeightExercise,
} from "../hooks/workouts/useExercises";
import { useNavigate } from "react-router-dom";

export default function WorkoutForm() {
  // Global context data
  const {
    currentWorkoutDetails,
    setCurrentWorkoutDetails,
    currentUser,
    workoutDate,
    setWorkoutDate,
    workoutName,
    setWorkoutName,
  } = useContext(GlobalDataContext);

  // Local error states
  const [inputError, setInputError] = useState("");
  const [loading, setLoading] = useState(false);

  // State to toggle between nonWeightExerciseForm and WeightExerciseForm
  const [workoutType, setWorkoutType] = useState("weight");

  // Custom hooks for db manipulation
  const { mutateAsync: addNewWorkout } = useAddNewWorkout();
  const { mutateAsync: addNonWeightExercise } = useAddNewNonWeightExercise();
  const { mutateAsync: addWeightExercise } = useAddNewWeightExercise();
  const { mutateAsync: addWeightExerciseSet } = useAddNewWeightExerciseSet();

  // Navigation
  const navigate = useNavigate();
  // Handles adding of workout and its exercises to the db
  const handleSubmitWorkout = async () => {
    if (!currentUser) {
      navigate("/authentication");
      // Stops the execution
      return;
    }
    if (!workoutDate || !workoutName) {
      setInputError("Please enter workout name and date.");
      return;
    } else if (currentWorkoutDetails.length === 0) {
      setInputError("Please add at least one exercise.");
      return;
    }
    setLoading(true);
    setInputError("");
    try {
      // Calls mutateAsync directly and gets the workout ID
      const workoutId = await addNewWorkout({
        created_at: workoutDate,
        user_id: currentUser.id,
        workout_name: workoutName.trim().toLowerCase(),
      });

      if (workoutId) {
        // Filters for weight exercises
        const weightExercises = currentWorkoutDetails.filter(
          (exercise) => exercise.type === "weight"
        );

        if (weightExercises.length > 0) {
          // Awaits till all Promises are resolved
          await Promise.all(
            weightExercises.map(async (currentWeightExercise) => {
              const weightExerciseId = await addWeightExercise({
                workout_id: workoutId,
                user_id: currentUser.id,
                exercise: currentWeightExercise.data.exercise,
              });

              // inserts each set with the weightExerciseId
              await Promise.all(
                currentWeightExercise.data.sets.map(async (currentSet) => {
                  await addWeightExerciseSet({
                    exercise_id: weightExerciseId,
                    user_id: currentUser.id,
                    set_number: currentSet.setNumber,
                    reps: currentSet.reps,
                    weight: currentSet.weight,
                  });
                })
              );
            })
          );
        }

        // Filters for non-weight exercises
        const nonWeightExercises = currentWorkoutDetails.filter(
          (exercise) => exercise.type === "nonWeight"
        );
        if (nonWeightExercises.length > 0) {
          // Awaits till all Promises are resolved
          await Promise.all(
            nonWeightExercises.map(async (currentNonWeightExercise) => {
              await addNonWeightExercise({
                workout_id: workoutId,
                user_id: currentUser.id,
                exercise: currentNonWeightExercise.data.exercise,
                duration: currentNonWeightExercise.data.duration,
                distance: currentNonWeightExercise.data.distance,
              });
            })
          );
        }
        setWorkoutDate("");
        setWorkoutName("");
        setCurrentWorkoutDetails([]);
      } else {
        setInputError("Try again, something went wrong!");
      }
    } catch (error) {
      setInputError(error?.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 bg-white shadow-md rounded-md w-full sm:w-[500px]">
      <div className="flex flex-col mb-4 text-sm md:text-base">
        {inputError.length > 0 && <p className="text-red-500">{inputError}</p>}
        <label htmlFor="date" className="">
          Workout Date
        </label>
        <input
          name="workoutDate"
          id="date"
          type="date"
          value={workoutDate}
          onChange={(e) => setWorkoutDate(e.target.value)}
          className="w-full px-3 p-1 mb-2 border rounded-md"
        />
        <input
          name="workoutName"
          placeholder="Workout name (e.g. leg day)"
          type="text"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      {currentWorkoutDetails.length > 0 && <NewWorkoutExerciseInfo />}
      <div className="flex justify-around mb-4">
        <p
          className={`text-sm py-1 px-4 cursor-pointer transition-all duration-300 ${
            workoutType === "weight"
              ? "border-b-2 border-gray-500"
              : " hover:border-b-2 hover:border-gray-500"
          }`}
          onClick={() => setWorkoutType("weight")}
        >
          Weight
        </p>
        <p
          className={`text-sm py-1 px-4 cursor-pointer transition-all duration-300 ${
            workoutType === "nonWeight"
              ? "border-b-2 border-gray-500"
              : "hover:border-b-2 hover:border-gray-500"
          }`}
          onClick={() => setWorkoutType("nonWeight")}
        >
          Non-Weight
        </p>
      </div>

      {workoutType === "weight" ? (
        <WeightExerciseForm />
      ) : (
        <NonWeightExerciseForm />
      )}

      <button
        className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-md py-2 mt-4"
        onClick={handleSubmitWorkout}
        disabled={loading}
      >
        {loading ? "Adding..." : "Submit Workout"}
      </button>
    </div>
  );
}
