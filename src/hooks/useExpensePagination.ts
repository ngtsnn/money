import { startOfMonth } from "date-fns/startOfMonth";
import httpService from "services/http";
import useSWR from "swr";
import { Expense, WithPagination } from "types/datatypes";



export const useExpensePagination = ({ pagination }: WithPagination) => {
  const { data, error, isLoading } = useSWR(
    ["getExpensePagination", pagination.page, pagination.pageSize],
    async ([, page, size]) => {
      const budgets = await httpService.get("/expense", {
        params: {
          page: page,
          size: size
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
