
import httpService from "services/http";
import useSWR from "swr";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  language_code: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export const useUser = () => {
  const { data, error, isLoading, mutate, } = useSWR("getUserInfo", async () => {
    try {
      const user = await httpService.get<User>("/users/me");
      return user;
    } catch (error) {
      return undefined
    }
  }, {
    refreshInterval: 86400000,
  });

  return { user: data, error, isLoading, mutate };
};
