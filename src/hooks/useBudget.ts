
import httpService from "services/http";
import useSWR from "swr";
import type { Budget } from "types/datatypes";


export const useBudgets = () => {
  const { data, error, isLoading } = useSWR("getBudget", async () => {
    const budgets = await httpService.get('/budget');
    return budgets as Budget[];
  }, {
    refreshInterval: 3600000
  });

  return { data, error, isLoading };

};
