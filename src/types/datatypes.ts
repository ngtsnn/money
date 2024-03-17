
export interface WithPagination<T = any> {
  pagination: {
    page: number,
    pageSize: number,
  }
  query?: T
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  period: "D" | "M" | "Y";
}


export interface Expense {
  id: string;
  budgetId: string;
  budget: Partial<Budget>
  amount: 50000;
  product?: string;
  createdAt: string;
  updatedAt: string;
}
