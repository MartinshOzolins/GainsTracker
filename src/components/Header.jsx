// MUI icons
import MenuIcon from "@mui/icons-material/Menu";
// native react hooks
import { useContext, useState } from "react";
//global context
import globalDataContext from "../context/GlobalDataContext";
//navigation
import { NavLink, useLocation } from "react-router-dom";
// custom hook for sign out
import { useUserSignOut } from "../hooks/userHooks/useUser";

export default function Header() {
  const { currentUser, setCurrentUser } = useContext(globalDataContext);

  // Sidebar state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Handles sign out
  const { mutateAsync: signOut } = useUserSignOut();
  const handleLogOut = async () => {
    await signOut();
    setCurrentUser(undefined);
  };

  // Checks pathname to display/hide sign in button if user is in SignIn page
  const location = useLocation();

  return (
    <header className="row-start-1">
      <div className="grid grid-cols-[80px_1fr_80px] items-center px-2 sm:px-4 py-2 bg-gray-50">
        <div className="">
          <MenuIcon sx={{ fontSize: 30 }} onClick={toggleMenu} />
        </div>
        <h2 className="text-lg md:text-xl font-semibold text-center ">
          GainsTracker
        </h2>
        <div className="">
          {!currentUser && !location.pathname.includes("/authentication") && (
            <NavLink
              to="/authentication"
              className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Sign In
            </NavLink>
          )}
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 h-full bg-gray-700 text-white transition-transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 z-20`}
      >
        <div className="flex justify-end items-center p-4 border-b border-gray-700">
          <button
            className="text-gray-300 hover:text-white"
            onClick={toggleMenu}
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4 pt-0">
          <NavLink to="/" className="hover:text-gray-300" onClick={toggleMenu}>
            Home
          </NavLink>
          <NavLink
            to="/profile"
            className="hover:text-gray-300"
            onClick={toggleMenu}
          >
            Profile
          </NavLink>
          <NavLink
            to="/workouts"
            className="hover:text-gray-300"
            onClick={toggleMenu}
          >
            Workouts
          </NavLink>
          {currentUser && (
            <button
              onClick={handleLogOut}
              className="border border-gray-300 hover:bg-gray-200 rounded-md px-4 py-1"
            >
              Sign Out
            </button>
          )}
        </nav>
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
}
