import { useContext, useEffect, useState } from "react";

//global context
import globalDataContext from "../context/GlobalDataContext";

export default function NewWorkoutExerciseInfo() {
  const { currentWorkoutDetails } = useContext(globalDataContext);

  const [nonWeightExercises, setNonWeightExercises] = useState([]);
  const [weightExercises, setWeightExercises] = useState([]);

  useEffect(() => {
    if (currentWorkoutDetails) {
      setNonWeightExercises(
        currentWorkoutDetails.filter(
          (exercise) => exercise.type === "nonWeight"
        )
      );
      setWeightExercises(
        currentWorkoutDetails.filter((exercise) => exercise.type === "weight")
      );
    }
  }, [currentWorkoutDetails]);

  return (
    <div className="w-full flex flex-col mb-5">
      {(weightExercises.length > 0 || nonWeightExercises.length > 0) && (
        <p>Current Exercsies</p>
      )}
      {weightExercises.length > 0 && (
        <div className="flex flex-col">
          <p className="text-sm">Weight</p>
          <table className="table-auto w-full border-collapse border border-gray-300 text-sm md:text-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Exercise</th>
                <th className="border border-gray-300 px-4 py-2">Sets</th>
              </tr>
            </thead>
            <tbody>
              {weightExercises.map((exercise, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">
                    {exercise.data.exercise}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {exercise.data.sets
                      .map(
                        (set) =>
                          `${set.setNumber}.st ${set.reps}x${set.weight}kg`
                      )
                      .join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {nonWeightExercises.length > 0 && (
        <div className="flex flex-col mt-2">
          <p className="text-sm">Non-Weight</p>
          <table className="table-auto w-full border-collapse border border-gray-300 text-sm md:text-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Exercise</th>
                <th className="border border-gray-300 px-4 py-2">Duration</th>
                <th className="border border-gray-300 px-4 py-2">Distance</th>
              </tr>
            </thead>
            <tbody>
              {nonWeightExercises.map((exercise, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">
                    {exercise.data.exercise}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {exercise.data.duration === null
                      ? null
                      : `${exercise.data.duration}min`}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {exercise.data.distance === null
                      ? null
                      : `${exercise.data.distance}km`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
