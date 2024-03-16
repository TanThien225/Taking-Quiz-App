import React from "react";
import useStateContext from "../Hooks/useStateContext";
import { Navigate, Outlet } from "react-router-dom";

export default function Authenticate() {
  const { context } = useStateContext();

  return context.testerId === 0 ? <Navigate to="/" /> : <Outlet />;
}
