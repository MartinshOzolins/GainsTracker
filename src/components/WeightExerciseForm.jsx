import { useContext, useState } from "react";

// context
import { GlobalDataContext } from "../context/globalDataContext";

export default function WeightExerciseForm() {
  const { setCurrentWorkoutDetails } = useContext(GlobalDataContext);

  //local error and loading states
  const [inputError, setInputError] = useState("");
  const [loading, setLoading] = useState(false);

  // weight exercise states
  const [weightExerciseDetails, setWeightExerciseDetails] = useState({
    exercise: "",
    sets: [],
  });
  const [setInput, setSetInput] = useState({ reps: "", weight: "" });

  // Handles set adding
  const handleAddSet = () => {
    const { reps, weight } = setInput;
    // Converts reps and weight to numbers
    const numericReps = Number(reps);
    const numericWeight = Number(weight);
    // Cheks for invalid inputs
    if (reps > 0 && weight > 0 && Number.isInteger(numericReps)) {
      setInputError("");
      setWeightExerciseDetails((prev) => ({
        ...prev,
        sets: [
          ...prev.sets,
          {
            setNumber: prev.sets.length + 1,
            reps: numericReps,
            weight: numericWeight,
          },
        ],
      }));
      setSetInput({ reps: "", weight: "" }); // Resets set inputs after adding
    } else {
      setInputError("Please enter valid reps and weight.");
    }
  };

  const handleAddWeightExerciseToWorkout = () => {
    if (
      !weightExerciseDetails.exercise.trim() ||
      weightExerciseDetails.exercise.trim().length < 2
    ) {
      setInputError("Please enter an exercise name.");
      return;
    }
    if (weightExerciseDetails.sets.length === 0) {
      setInputError("You need to add at least one set.");
      return;
    }
    setLoading(true); // Shows loading
    setInputError(""); // Clears error
    const newWeightExerciseDetails = {
      // Specifies type for filtering
      type: "weight",
      data: {
        exercise: weightExerciseDetails.exercise.trim().toLowerCase(),
        sets: weightExerciseDetails.sets,
      },
    };
    // Adds to workout exercise list
    setCurrentWorkoutDetails((prev) => [...prev, newWeightExerciseDetails]);
    // Hides loading
    setLoading(false);
    // Clears inputs
    setWeightExerciseDetails({
      exercise: "",
      sets: [],
    });
  };

  return (
    <div className="p-4 bg-gray-100 shadow-md rounded-md">
      {inputError && <p className="text-red-500 text-sm">{inputError}</p>}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold ">Weight Exercise</h2>
        <button
          onClick={handleAddWeightExerciseToWorkout}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm md:text-base"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add to Workout"}
        </button>
      </div>
      <input
        type="text"
        name="exercise"
        value={weightExerciseDetails.exercise}
        placeholder="Exercise (e.g. Bench Press)"
        onChange={(e) =>
          setWeightExerciseDetails((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        className="w-full mb-4 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <hr className="mb-4 border-gray-300" />
      {weightExerciseDetails.sets.length > 0 && (
        <div className="my-4">
          <h3 className="text-md">Current Sets</h3>
          <ul className="mt-2 space-y-2">
            {weightExerciseDetails.sets.map((set, index) => (
              <li
                key={index}
                className="p-2 bg-gray-200 rounded-md text-sm flex justify-between"
              >
                <span>Set {set.setNumber}</span>
                <span>{set.reps} Reps</span>
                <span>{set.weight} kg</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          name="reps"
          value={setInput.reps}
          placeholder="Reps"
          onChange={(e) => setSetInput({ ...setInput, reps: e.target.value })}
          className="w-1/3 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          type="number"
          name="weight"
          value={setInput.weight}
          placeholder="Weight (kg)"
          onChange={(e) => setSetInput({ ...setInput, weight: e.target.value })}
          className="w-1/3 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleAddSet}
          className="w-1/3 text-black py-2 rounded-md border-2 hover:bg-gray-200"
        >
          Add Set
        </button>
      </div>
    </div>
  );
}
