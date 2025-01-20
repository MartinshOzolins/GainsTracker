
import { useMutation, useQuery } from "@tanstack/react-query";

//api functions
import { getWorkouts, addNewWorkout, getWeightExercises, addWeightExercise, updateWeightExercise, deleteWeightExercise, getWeightExerciseSets, addWeightExerciseSet, updateWeightExerciseSet, deleteWeightExerciseSet, getNonWeightExercises, addNonWeightExercise, updateNonWeightExercise, getWorkoutsDataWithExercises, getWorkoutCount, deleteWorkout } from "../../services/exercisesAPI";


// Custom hooks for workouts
// hook for fetching all workouts
export const useGetWorkouts = ({user_id, isEnabled}) => {
    return useQuery({
        queryKey: ["workouts"],
        queryFn: () => getWorkouts(user_id),
        enabled: false,
        ...isEnabled,
    })
}

// hook for adding a new workout
export const useAddNewWorkout = () => {
    return useMutation({
        mutationFn: ({created_at, user_id, workout_name}) => {
            return addNewWorkout(created_at, user_id, workout_name)
        }
    })
}

// hook for updating a workout
export const useUpdateWorkout = () => {
    return useMutation({
        mutationFn: ({workout_id, user_id, created_at, workout_name}) => {
            return addNewWorkout (workout_id, user_id, created_at, workout_name)
        }
    })
}

// hook for deleting a workout
export const useDeleteWorkout = () => {
    return useMutation({
         mutationFn: ({workout_id, user_id}) => {
            return deleteWorkout (workout_id, user_id)
        }
    })
}



// Custom hooks for weight exercises
// hook for fetching all weight exercises
export const useGetWeightExercises = ({user_id, isEnabled}) => {
    return useQuery({
        queryKey: ["weight-exercises"],
        queryFn: () => getWeightExercises(user_id),
        enabled: false,
        ...isEnabled,
    })
}
// hook for adding a new weight exercise
export const useAddNewWeightExercise = () => {
    return useMutation({
        mutationFn: ({workout_id, user_id, exercise}) => {
            return addWeightExercise(workout_id, user_id, exercise)
        }
    })
}
// hook for updating weight exercise
export const useUpdateWeightExercise = () => {
    return useMutation({
        mutationFn: ({exercise_id, user_id, exercise}) => {
            return updateWeightExercise(exercise_id, user_id, exercise)
        }
    })
}
// hook for deleting weight exercise
export const useDeleteWeightExercise = () => {
    return useMutation({
        mutationFn: ({exercise_id, user_id}) => {
            return deleteWeightExercise(exercise_id, user_id)
        }
    })
}


// Custom hooks for weight exercise sets
// hook for fetching all weight exercise sets
export const useGetWeightExerciseSets = ({exercise_id, user_id, isEnabled}) => {
    return useQuery({
        queryKey: ["weight-workout-sets"],
        queryFn: () => getWeightExerciseSets(exercise_id, user_id),
        enabled: false,
        ...isEnabled
    })
}

// hook for adding a new weight exercise set
export const useAddNewWeightExerciseSet = () => {
    return useMutation({
        mutationFn: ({exercise_id, user_id, set_number, reps, weight}) => {
            return addWeightExerciseSet(exercise_id, user_id, set_number, reps, weight)
        }
    })
}
// hook for updating a weight exercise set
export const useUpdateWeightExerciseSet = () => {
    return useMutation({
        mutationFn: ({set_id, user_id, set_number, reps, weight}) => {
            return updateWeightExerciseSet(set_id, user_id, set_number, reps, weight)
        }
    })
}
// hook for deleting a weight exercise set
export const useDeleteWeightExerciseSet = () => {
    return useMutation({
        mutationFn: ({set_id, user_id}) => {
            return deleteWeightExerciseSet(set_id, user_id)
        }
    })
}



// Custom hooks for non-weight exercises
// hook for fetching all non-weight workouts
export const useGetNonWeightExercises = ({user_id, isEnabled}) => {
    return useQuery({
        queryKey: ["non-weight-exercises"],
        queryFn: () => getNonWeightExercises(user_id),
        enabled: false,
        ...isEnabled
    })
}

// hook for adding a new non-weight workout
export const useAddNewNonWeightExercise = () => {
    return useMutation({
        mutationFn: ({workout_id, user_id, exercise, duration, distance}) => {
            return addNonWeightExercise(workout_id, user_id, exercise, duration, distance)
        }
    })
}
// hook for updating a non-weight workout
export const useUpdateNonWeightExercise = () => {
    return useMutation({
        mutationFn: ({exercise_id, user_id, exercise, duration, distance}) => {
            return updateNonWeightExercise(exercise_id, user_id, exercise, duration, distance)
        }
    })
}
// hook for deleting a non-weight workout
export const useDeleteNonWeightExercise = () => {
    return useMutation({
        mutationFn: ({exercise_id, user_id}) => {
            return deleteWeightExercise(exercise_id, user_id)
        }
    })
}


export const useGetWorkoutsDataWithExercises = ({user_id, isEnabled}) => {
    return useQuery({
        queryKey: ["workouts"],
        queryFn: () => getWorkoutsDataWithExercises(user_id),
        enabled: false,
        ...isEnabled
    })
}


export const useGetWorkoutCount = ({user_id, isEnabled}) => {
    return useQuery({
        queryKey: ["workoutCount"],
        queryFn: () => getWorkoutCount(user_id),
        enabled: false,
        ...isEnabled
    })
}



