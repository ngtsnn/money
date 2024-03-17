import { useEffect } from "react";
import { useUser } from "./useUser";
import { redirect } from "react-router-dom";

const useProtected = () => {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/login");
    }
  }, [isLoading, user]);

  return { user, error, isLoading };
};

export default useProtected;
