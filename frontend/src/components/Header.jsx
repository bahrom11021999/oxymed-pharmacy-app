import React from "react";
import { useCheckAuth } from "../hooks/useCheckAuth";
import Loader from "./Loader";
import useLogout from "../hooks/useLogout";
import { NavLink, useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

const Header = ({ title }) => {
  const { user, isLoading } = useCheckAuth();
  const { logout, isLoading: isLoggingOut } = useLogout();
  const navigate = useNavigate();

  const isAdmin = user.data.role === "admin";

  if (isLoading) {
    return <Loader />;
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-between text-slate-800">
      {!title && (
        <>
          <NavLink to="/" className="flex flex-col gap-1">
            <h1 className="text-xl font-bold">Welcome, {user.data.username}</h1>
            <p className="text-xs">
              {isAdmin
                ? "This is the admin dashboard"
                : "This is the user dashboard"}
            </p>
          </NavLink>
          <div>
            <button
              className="rounded bg-slate-800 px-4 py-2 text-slate-50"
              type="button"
              onClick={logout}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </>
      )}

      {title && (
        <>
          <button
            className="flex items-center gap-2"
            onClick={handleBack}
            type="button"
          >
            <IoArrowBackOutline className="text-xl" />
            <p>Back</p>
          </button>
          <h1 className="text-xl font-normal">{title}</h1>
        </>
      )}
    </div>
  );
};

export default Header;
