
//supabase
import supabase from "../supabase.js"

export const signUp = async (email, password) => {
    const response = await supabase.auth.signUp({
        email: email,
        password: password,
    })
    if(response) return response
}

export const signIn = async (email, password) => {
      const response = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if(response) return response
  };
  


export const singOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) return error
}

// Sends an email with a redirect link
export const sendResetPasswordRequest = async (email) => {
    const response =  await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: import.meta.env.VITE_REDIRECT_URL,
      })
    if (response) return response
}


// Handles password change
export const resetPassword = async (new_password) => {
    const response = await supabase.auth.updateUser({
        password: new_password
      })
    if (response) return response
}