import { Route, Routes } from "react-router-dom";
//supabase
import supabase from "./supabase";
//MUI components
import CircularProgress from "@mui/material/CircularProgress";
//pages
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Workouts from "./pages/Workouts";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
//components
import Header from "./components/Header";
// native hooks
import { useContext, useEffect, useState } from "react";
//global data
import globalDataContext from "./context/GlobalDataContext.js";

export default function App() {
  const { currentUser, setCurrentUser } = useContext(globalDataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      const checkAuthenticatedUser = async () => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (user) {
            setCurrentUser(user);
          }
        } catch (error) {
          console.error("Error checking user:", error.message);
        } finally {
          setLoading(false);
        }
      };
      checkAuthenticatedUser();
    } else {
      setLoading(false);
    }
  }, [currentUser, setCurrentUser]);

  if (loading)
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <CircularProgress />
      </div>
    );

  return (
    <>
      <Header />
      <main className="row-start-2">
        <Routes>
          <Route index="/" element={<Home />} />
          <Route path="/authentication" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}
