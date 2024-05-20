import React from "react";
import { NavLink } from "react-router-dom";

const Error = ({ message }) => {
  if (!message) {
    message = "Page not found";
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-2xl">{message}</h1>

      <NavLink
        to="/"
        className="ml-4 rounded-md bg-slate-800 px-4 py-2 text-2xl text-slate-50"
      >
        Go back home
      </NavLink>
    </div>
  );
};

export default Error;
