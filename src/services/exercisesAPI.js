// Supabase import
import supabase from "../supabase.js"

// Get workout info and then both exercises types and save that into an array with seperate workouts
export const getWorkoutsDataWithExercises = async (user_id) => {
  try {
    // Fetches all workouts for the user
    const { data: workout_data, error: workoutError } = await supabase
      .from("workouts")
      .select("*")
      .eq("user_id", user_id);

    if (workoutError) throw workoutError;
    if (!workout_data) return [];

    // Fetches all non-weight exercises for the user
    const { data: non_weight_exercises, error: nonWeightError } = await supabase
      .from("non_weight_exercises")
      .select("*")
      .eq("user_id", user_id);

    if (nonWeightError) throw nonWeightError;

    // Fetches all weight exercises for the user
    const { data: weight_exercises, error: weightError } = await supabase
      .from("weight_exercises")
      .select("*")
      .eq("user_id", user_id);

    if (weightError) throw weightError;

    // Fetches all weight exercise sets for the user
    const { data: weight_exercise_sets, error: setsError } = await supabase
      .from("weight_exercise_sets")
      .select("*")
      .eq("user_id", user_id);

    if (setsError) throw setsError;

    // Combines the data into the desired format
    const fullWorkoutsData = workout_data.map((workout) => {
      const workout_id = workout.id;

      // Filters exercises for the current workout
      const nonWeight = non_weight_exercises.filter(
        (exercise) => exercise.workout_id === workout_id
      );

      const weight = weight_exercises
        .filter((exercise) => exercise.workout_id === workout_id)
        .map((exercise) => ({
          ...exercise,
          sets: weight_exercise_sets.filter(
            (set) => set.exercise_id === exercise.id
          ),
        }));

      return {
        workoutInfo: workout,
        nonWeight,
        weight,
      };
    });

    return fullWorkoutsData;
  } catch (error) {
    console.error("Error fetching workout data:", error);
    return [];
  }
};


// Get all workouts (read)
export const getWorkouts = async (user_id) => {
  let { data: workouts, error } = await supabase
  .from('workouts')
  .select('*')
  .eq("user_id", user_id)
  if (workouts) return workouts
  if (error) console.log(error)
}


// Get only workout count to compare it with cache and avoid re-fetch of all workouts
export const getWorkoutCount = async (user_id) => {
  const { data: workoutCount } = await supabase
  .from('workouts')
  .select('id', { count: 'exact' })
  .eq('user_id', user_id);
  if (workoutCount) return workoutCount
}

// Add new workout (insert)
export const addNewWorkout = async (created_at, user_id, workout_name) => {
  const { data: workout, error } = await supabase
  .from('workouts')
  .insert([
    {created_at: created_at, user_id: user_id, workout_name: workout_name},
  ])
  .select('id')
  if (workout) return workout
  if (error) console.log(error)
} 


// Update a workout (update)
export const updateWorkout = async (workout_id, user_id, created_at, workout_name) => {
  const { data, error } = await supabase
  .from('workouts')
  .update({created_at: created_at, workout_name: workout_name})
  .eq('id', workout_id)
  .eq('user_id', user_id)
  .select()
  .eq("user_id", user_id)
  if (data) return data
  if (error) console.log(error)
}

// Delete a workout (delete)
export const deleteWorkout = async (workout_id, user_id) => {
  const { error } = await supabase
  .from('workouts')
  .delete()
  .eq('id', workout_id)
  .eq('user_id', user_id)
  if(error) console.log(error)
}



// weight-workout functions
// Get all weight exercises (read)
export const getWeightExercises = async (user_id) => {
  let { data: weight_exercises, error } = await supabase
  .from('weight_exercises')
  .select('*')
  .eq('user_id', user_id)
  if( weight_exercises) return weight_exercises
  if (error) console.log(error)
}

// Add new weight exercise (insert)
export const addWeightExercise = async (workout_id, user_id, exercise) => {
  const { data: weight_exercise, error } = await supabase
  .from('weight_exercises')
  .insert([
    { workout_id: workout_id, user_id: user_id, exercise: exercise},
  ])
  .select('id')
  if( weight_exercise) return weight_exercise[0].id
  if (error) console.log(error)
}

// Update a weight exercise (update)
export const updateWeightExercise = async (exercise_id, user_id, exercise) => {
  const { data, error } = await supabase
  .from('weight_exercises')
  .update({ exercise: exercise})
  .eq('id', exercise_id)
  .eq('user_id', user_id)
  .select('*')
  .eq('user_id', user_id)
  if (data) return data
  if (error) console.log(error)
}

// Delete a weight exercise (delete)
export const deleteWeightExercise = async (exercise_id, user_id) => {
  const { error } = await supabase
  .from('weight_exercises')
  .delete()
  .eq('id', exercise_id)
  .eq('user_id', user_id)
  if(error) console.log(error)
}



//weight_exercise_sets functions
// Get all sets for a weight exercise (read)
export const getWeightExerciseSets = async (exercise_id, user_id ) => {
  let { data: weight_exercise_sets, error } = await supabase
  .from('weight_exercise_sets')
  .select('*')
  .eq('user_id', user_id)
  .eq('exercise_id', exercise_id)
  if (weight_exercise_sets) return weight_exercise_sets
  if (error) console.log(error)
}

// Add a set to a weight exercise (insert)
export const addWeightExerciseSet = async (exercise_id, user_id, set_number, reps, weight) => {
  const { data: weight_exercise_sets, error } = await supabase
  .from('weight_exercise_sets')
  .insert([
    { exercise_id: exercise_id, user_id:user_id, set_number: set_number, reps: reps, weight: weight },
  ])
  .select('*')
  .eq('user_id', user_id)
  if (weight_exercise_sets) return weight_exercise_sets
  if (error) console.log(error)
} 


// Update a set for a weight exercise (update)
export const updateWeightExerciseSet = async (set_id, user_id, set_number, reps, weight) => {
  const { data: weight_exercise_sets, error } = await supabase
  .from('weight_exercise_sets')
  .update({ set_number: set_number, reps: reps, weight: weight })
  .eq('id', set_id)
  .eq('user_id', user_id)
  .select('*')
  .eq('user_id', user_id)
  if (weight_exercise_sets) return weight_exercise_sets
  if (error) console.log(error)

}

// Delete a set from a weight exercise (delete)
export const deleteWeightExerciseSet = async (set_id, user_id) => {
  
  const { error } = await supabase
  .from('weight_exercise_sets')
  .delete()
  .eq('id', set_id)
  .eq('user_id', user_id)
  if(error) console.log(error)
}






//non-weight workout functions
// Get all non-weight exercises (read)
export const getNonWeightExercises = async (user_id) => {
  let { data: non_weight_exercises, error } = await supabase
  .from('non_weight_exercises')
  .select('*')
  .eq('user_id', user_id)
  if( non_weight_exercises) return non_weight_exercises
  if (error) console.log(error)
}

// Add a new non-weight exercise (insert)
export const addNonWeightExercise = async (workout_id, user_id, exercise, duration = null, distance = null ) => {
  const { data: non_weight_exercises, error } = await supabase
  .from('non_weight_exercises')
  .insert([
    { workout_id: workout_id, user_id: user_id, exercise: exercise, duration: duration, distance: distance },
  ])
  .select('*')
  .eq('user_id', user_id)
  if( non_weight_exercises) return non_weight_exercises
  if (error) console.log(error)
}

// Update a non-weight exercise (update)
export const updateNonWeightExercise = async (exercise_id, user_id, exercise, duration = null, distance = null) => {
  const { data: non_weight_exercises, error } = await supabase
  .from('non_weight_exercises')
  .update({exercise: exercise, duration: duration, distance: distance })
  .eq('id', exercise_id)
  .select('*')
  .eq('user_id', user_id)
  if( non_weight_exercises) return non_weight_exercises
  if (error) console.log(error)

}

// Delete a non-weight exercise (delete)
export const deleteNonWeightExercise = async (exercise_id, user_id) => {
  const { error } = await supabase
  .from('non_weight_exercises')
  .delete()
  .eq('id', exercise_id)
  .eq('user_id', user_id)
  if (error) console.log(error)
}


