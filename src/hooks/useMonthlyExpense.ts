import { endOfMonth } from "date-fns/endOfMonth";
import { startOfMonth } from "date-fns/startOfMonth";
import httpService from "services/http";
import useSWR from "swr";
import { Expense } from "types/datatypes";

export const useMonthlyExpense = () => {
  const { data, error, isLoading } = useSWR(
    "getMonthlyExpense",
    async () => {
      const now = Date.now();
      const monthFirst = startOfMonth(now);
      const monthLast = endOfMonth(now);
      const budgets = await httpService.get("/expense", {
        params: {
          from: monthFirst.getTime(),
          to: monthLast.getTime(),
        },
      });
      return budgets as Expense[];
    },
    {
      refreshInterval: 3600000,
    }
  );

  return { data, error, isLoading };
};
