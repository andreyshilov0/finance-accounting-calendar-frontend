export interface IIncome {
  name: string;
  amount: number;
  date: string;
  incomeCategory: {
    id: number;
    name: string;
  };
}

export interface IncomesProps {
  predefinedIncomeNames: string[];
  incomes: IIncome[];
}

interface IUseIncomeResponse {
  loading: boolean;
  error?: Error;
}

export interface IUseIncomeQuery extends IUseIncomeResponse {
  userIncomes: IIncome[];
}

export interface IUseIncomeMutationCreate extends IUseIncomeResponse {
  addIncome: (
    amount: number,
    name: string,
    incomeCategoryId: number
  ) => Promise<void>;
}
