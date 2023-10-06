export interface Income {
  name: string;
  amount: number;
};

export interface IncomesProps {
  predefinedIncomeNames: string[];
  incomes: Income[];
};
