import { IPayment, IIncome } from "@components/Financials/types";

export type ChartItem = IIncome | IPayment;

export type ChartData = {
  title: string;
  value: number;
  color: string;
};

export type ChartSectionComponentProps = {
  titleLocalesKey: string;
  data: ChartData[];
  total: number;
  totalLocalesKey: string;
  noDataMessageKey: string;
};
