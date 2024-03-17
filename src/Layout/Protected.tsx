import { useUser } from "hooks/useUser";
import React, { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: FC = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <></>;
  }

  if (!isLoading && !user) {
    return <Navigate to="/login" />;
  }

  return <Outlet/>;
};

export default ProtectedRoute
