import { FC, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "hooks/useUser";
import { useBudgets } from "hooks/useBudget";
import Container from "atoms/Container";
import { Auth } from "components/Auth";
import Skeleton from "antd/es/skeleton";
import Card from "antd/es/card/Card";
import Table, { TableProps } from "antd/es/table";
import numbro from "numbro";
import { useMonthlyExpense } from "hooks/useMonthlyExpense";
import { useExpensePagination } from "hooks/useExpensePagination";
import { ChevronLeft, ChevronRight } from "react-feather";

const transactionColumns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Budget",
    dataIndex: "budget",
    key: "budget",
    render(budget) {
      return budget?.category ?? "--";
    },
  },
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
    render(value) {
      return value || "--";
    },
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
] as TableProps["columns"];

const vndFormat = (x: number) =>
  numbro(x).formatCurrency({
    currencySymbol: "₫",
    mantissa: 0,
    currencyPosition: "postfix",
    spaceSeparatedCurrency: true,
    thousandSeparated: true,
  });

const Home: FC = () => {
  const [page, setPage] = useState(1);
  const { data: budgets, isLoading: budgetLoading } = useBudgets();
  const { data: monthlyExpenses, isLoading: monthlyExpenseLoading } = useMonthlyExpense();
  const { data: expense, isLoading: expenseLoading } = useExpensePagination({
    pagination: {
      page: page,
      pageSize: 10,
    },
  });

  const totalBudget = useMemo(() => {
    if (!budgets) return 0;
    const total = budgets.reduce((t: number, b) => {
      const period = b?.period ?? "M";
      const amount = b?.amount ?? 0;

      switch (period) {
        case "D": {
          const now = new Date();
          const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
          return t + amount * daysInMonth;
        }

        case "Y": {
          return t + amount / 12;
        }

        case "M":
        default: {
          return t + amount;
        }
      }
    }, 0);
    return total;
  }, [budgets]);
  const formatedBudget = vndFormat(totalBudget);

  const totalSpend = useMemo(() => {
    if (!monthlyExpenses || monthlyExpenses.length <= 0) {
      return 0;
    }

    const total = monthlyExpenses.reduce((_total, e) => {
      const amount = typeof e?.amount === "number" ? e.amount : 0;
      return _total + (amount ?? 0);
    }, 0);
    return total;
  }, [monthlyExpenses]);
  const formatedSpent = vndFormat(totalSpend);

  return (
    <Container className="">
      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <h3 className="text-2xl font-bold">Monthly recap</h3>

          <div className="grid min-[650px]:grid-cols-3 gap-4">
            <Card className="flex flex-col space-y-6 shadow-md">
              <div className="text-base">Total Budget</div>
              {budgetLoading ? (
                <Skeleton loading={budgetLoading} paragraph={{ rows: 1 }} />
              ) : (
                <div className="text-2xl font-bold">{formatedBudget}</div>
              )}
            </Card>
            <Card className="flex flex-col space-y-6 shadow-md">
              <div className="">Spent</div>
              {monthlyExpenseLoading ? (
                <Skeleton loading={monthlyExpenseLoading} paragraph={{ rows: 1 }} />
              ) : (
                <div className="text-2xl font-bold">{formatedSpent}</div>
              )}
            </Card>
            <Card className="flex flex-col space-y-6 shadow-md">
              <div className="">Total transactions</div>
              {monthlyExpenseLoading ? (
                <Skeleton loading={monthlyExpenseLoading} paragraph={{ rows: 1 }} />
              ) : (
                <div className="text-2xl font-bold">{monthlyExpenses?.length ?? "--"}</div>
              )}
            </Card>
          </div>
        </section>

        <section className="">
          <h3 className="text-2xl font-bold">Monthly Budgets</h3>

          <Card className="shadow-md">
            {budgets?.map((b) => {
              return (
                <div key={b.id} className="w-full flex items-center justify-between">
                  <span className="text-sm md:text-lg font-semibold">{b.category}</span>
                  <span className="text-sm md:text-lg font-semibold">{vndFormat(b.amount)}</span>
                </div>
              );
            })}
          </Card>
        </section>
      </div>

      <div className="h-6"></div>

      <section className="">
        <h3 className="text-2xl font-bold">Transactions</h3>
        <Table
          className="shadow-md bg"
          rootClassName="rounded-xl overflow-hidden"
          pagination={{
            pageSize: 10,
            onChange(page) {
              setPage(page);
            },
            responsive: true,
            className: "bg-white dark:bg-gray-900 my-0 py-4",
            nextIcon: (
              <ChevronRight className="text-txt-primary dark:text-txt-primary-dark w-full h-full" />
            ),
            prevIcon: (
              <ChevronLeft className="text-txt-primary dark:text-txt-primary-dark w-full h-full" />
            ),
          }}
          loading={expenseLoading}
          columns={transactionColumns}
          scroll={{ x: true }}
          rowKey={(r) => r.id}
          dataSource={expense ?? []}
        />
      </section>
    </Container>
  );
};

export default Home;
