import { ICategory } from "@components/Settings/types";

export interface IFinancial {
  name: string;
  amount: number;
  date: string;
  category: ICategory;
}

export interface IIncome extends IFinancial {
  incomeCategory: ICategory;
}

export interface IPayment extends IFinancial {
  paymentCategory: ICategory;
}

export interface IIncomeCategory extends ICategory {}
export interface IPaymentCategory extends ICategory {}

export interface IncomesProps {
  predefinedIncomeNames: string[];
  incomes: IIncome[];
}

export type CategoryKey = "incomeCategory" | "paymentCategory";

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
  financialsCategories: ICategory[];
  financialsList: IIncome[] | IPayment[];
  financialsAdd: (amount: number, name: string, id: number) => void;
  financialsType: "incomes" | "payments";
  currentPage: number;
  setPage: (page: number) => void;
}
