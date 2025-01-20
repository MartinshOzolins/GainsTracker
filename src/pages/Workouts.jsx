import { useContext, useEffect, useState } from "react";
import LineChart from "../components/LineChart";
import {
  useGetWorkoutsDataWithExercises,
  useGetWorkoutCount,
  useDeleteWorkout,
} from "../hooks/workouts/useExercises";
import { GlobalDataContext } from "../context/globalDataContext";
import { useQueryClient } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";

export default function Workouts() {
  const { currentUser } = useContext(GlobalDataContext);
  const [showChart] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [checkCount, setCheckCount] = useState(false);
  const [getWorkouts, setGetWorkouts] = useState(false);

  // Custom hook to fetch workouts with all the exercises
  const {
    data: workoutData,
    isLoading,
    isError,
  } = useGetWorkoutsDataWithExercises({
    user_id: currentUser?.id,
    isEnabled: { enabled: getWorkouts },
  });

  // Custom hook to fetch workout count
  const { data: workoutCount } = useGetWorkoutCount({
    user_id: currentUser?.id,
    isEnabled: { enabled: checkCount },
  });

  // navigation and queryClient to get cache data
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    // Checks for wheter is authenticated
    if (!currentUser) {
      navigate("/authentication");
      return;
    }
    // if authenticated, checks workout count in db (without making multiple api calls)
    setCheckCount(true);
    // Retrievas cached workouts
    const cachedData = queryClient.getQueryData(["workouts"]);
    // Checks if cached workouts.length is equal to workout count in db
    // if there is equal number of cached workours and workouts in db, it prevents fetching and instead uses cached data
    if (!cachedData || workoutCount.length !== cachedData.length) {
      setGetWorkouts(true);
    }
  }, [workoutCount, queryClient, currentUser, navigate]);

  // Checks for workoutData, if exist, prevents fetching
  useEffect(() => {
    if (workoutData) {
      setGetWorkouts(false);
    }
  }, [workoutData]);

  // Handles opening of inspect modal
  const handleInspect = (workout) => {
    setSelectedWorkout(workout);
  };

  // Custom hook that removes workout from db
  const { mutateAsync: deleteWorkout } = useDeleteWorkout();
  const handleDeleteWorkout = async (workout) => {
    const workoutId = workout.workoutInfo.id;
    await deleteWorkout({ workout_id: workoutId, user_id: currentUser.id });
    setGetWorkouts(true);
  };

  return (
    <div className="w-full flex flex-col items-center pt-10 px-10">
      {!workoutData || !workoutData.length > 0 ? null : (
        <h1 className="text-2xl font-semibold pb-6">Workouts</h1>
      )}
      {showChart && (
        <div className="w-8/12 relative h-62 flex flex-col items-center">
          <LineChart />
        </div>
      )}
      <div className="w-3/4 flex flex-col items-center">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading workouts.</p>}
        {workoutData && workoutData.length > 0 ? (
          <table className="w-full border-collapse border text-xs md:text-sm">
            <thead>
              <tr>
                <th className="border-b p-2 text-left">Workout Date</th>
                <th className="border-b p-2 text-left">Workout Name</th>
                <th className="border-b p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workoutData.map((workout, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border-b p-2">
                    {workout?.workoutInfo?.created_at || "N/A"}
                  </td>
                  <td className="border-b p-2">
                    {workout?.workoutInfo?.workout_name || "N/A"}
                  </td>
                  <td className="border-b p-2">
                    <div className="flex flex-col md:flex-row items-left">
                      <button
                        onClick={() => handleInspect(workout)}
                        className="w-full h-full text-white bg-blue-500 hover:bg-blue-600 px-2 mb-0.5 py-1 mr-1 rounded"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => handleDeleteWorkout(workout)}
                        className="w-full h-full text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            {!isLoading && (
              <div className="w-full flex flex-col items-center p-4">
                <p className="text-lg font-semibold mb-5">
                  You have not added any workouts
                </p>
                <NavLink to="/" className="text-blue-500 hover:underline ">
                  Home Page
                </NavLink>
              </div>
            )}
          </>
        )}
      </div>
      {selectedWorkout && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50"
          onClick={() => setSelectedWorkout(null)}
        >
          <div
            className="bg-white p-6 rounded-md shadow-md w-3/4 max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Workout Details</h2>
            <p className="mb-2">
              <strong>Date:</strong>{" "}
              {selectedWorkout?.workoutInfo?.created_at || "N/A"}
            </p>
            <p className="mb-2">
              <strong>Name:</strong>{" "}
              {selectedWorkout?.workoutInfo?.workout_name || "N/A"}
            </p>

            <h3 className="text-lg font-semibold mt-4">Non-Weight Exercises</h3>
            {selectedWorkout?.nonWeight?.length > 0 ? (
              <ul className="list-disc list-inside">
                {selectedWorkout.nonWeight.map((exercise, index) => (
                  <li key={index}>
                    {exercise.exercise} - {exercise.duration} mins,{" "}
                    {exercise.distance} meters
                  </li>
                ))}
              </ul>
            ) : (
              <p>No non-weight exercises</p>
            )}

            <h3 className="text-lg font-semibold mt-4">Weight Exercises</h3>
            {selectedWorkout?.weight?.length > 0 ? (
              <ul className="list-disc list-inside">
                {selectedWorkout.weight.map((exercise, index) => (
                  <li key={index}>
                    {exercise.exercise} -{" "}
                    {exercise.sets.map((set, setIndex) => (
                      <span
                        key={setIndex}
                      >{`(${set.reps}x${set.weight}) `}</span>
                    ))}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No weight exercises recorded.</p>
            )}

            <button
              onClick={() => setSelectedWorkout(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
