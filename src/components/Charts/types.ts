import { IPayment, IIncome } from "@components/Financials/types";
import { ChartData } from "@components/ChartSectionComponent/types";

export type ChartItem = IIncome | IPayment;

export interface ChartsProps {
  incomeList: IIncome[];
  paymentList: IPayment[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  totalIncome: number;
  totalPayment: number;
  incomeData: ChartData[];
  paymentData: ChartData[];
}
