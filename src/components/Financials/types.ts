import { ICategory } from "@components/Settings/types";

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

export interface IPayment {
  name: string;
  amount: number;
  date: string;
  paymentCategory: {
    id: number;
    name: string;
  };
}

export interface PaymentsProps {
  predefinedPaymentNames: string[];
  payments: IPayment[];
}

interface IUsePaymentResponse {
  loading: boolean;
  error?: Error;
}

export interface IUsePaymentQuery extends IUsePaymentResponse {
  userPayments: IPayment[];
}

export interface IUsePaymentMutationCreate extends IUsePaymentResponse {
  addPayment: (
    amount: number,
    name: string,
    paymentCategoryId: number
  ) => Promise<void>;
}

export interface FinancialsProps {
  categories: ICategory[];
  list: IIncome[] | IPayment[];
  add: (amount: number, name: string, id: number) => void;
  type: "incomes" | "payments";
}
