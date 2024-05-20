import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useEffect, useState } from "react";
import { apiCheckAuth } from "../api/auth";
import { useCheckAuth } from "../hooks/useCheckAuth";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const { user, isLoading, error, isError, isSuccess } = useCheckAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return navigate("/login");
  }

  return children;
};

export default ProtectedRoute;
