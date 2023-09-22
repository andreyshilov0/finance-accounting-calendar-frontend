export type Income = {
  name: string;
  amount: number;
};

export type IncomesProps = {
  predefinedIncomeNames: string[];
  incomes: Income[];
};
