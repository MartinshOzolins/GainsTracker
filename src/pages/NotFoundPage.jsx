import { NavLink } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="w-full h-full flex flex-col items-center mt-10">
      <div className="flex flex-col items-center">
        <p className="text-center">
          Something went wrong. Try clicking the refresh page button to reload
          the application.
        </p>
        <p className="text-lg text-center">
          Go to the{" "}
          <NavLink
            to="/"
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Homepage
          </NavLink>
        </p>
      </div>
    </div>
  );
}
