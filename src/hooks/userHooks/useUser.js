import { useMutation } from "@tanstack/react-query";
import { signIn, signUp, singOut, sendResetPasswordRequest, resetPassword } from "../../services/userAPI";

export const useUserSignUp = () => {
  return useMutation({
    mutationFn: ({ email, password }) => {
      return signUp(email, password);
    },
    // onError: (error) => {
    //   console.log("SignUp Error:", error);
    // },
  });
};


export const useUserSignIn = () => {
  return useMutation({
      mutationFn: ({email, password}) => {
          return signIn(email, password)
      },
      // onSuccess: () => {
          
      // }
  })
}

export const useUserSignOut = () => {
  return useMutation({
    mutationFn: () => {
      return singOut()
    }
  })
}


export const useSendPasswordResetRequest = () => {
  return useMutation({
    mutationFn: ({email}) => {
      return sendResetPasswordRequest(email)
    }
  })
}

export const usePasswordReset = () => {
  return useMutation({
    mutationFn: ({new_password}) => {
      return resetPassword(new_password)
    }
  })
}