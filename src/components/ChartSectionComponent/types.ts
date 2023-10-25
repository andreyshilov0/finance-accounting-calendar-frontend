import { IPayment, IIncome } from "@components/Financials/types";

export type ChartItem = IIncome | IPayment;


export type ChartSectionComponentProps = {
  titleLocalesKey: string;
  data: {
    title: string;
    value: number;
    color: string;
  }[];
  total: number;
  totalLocalesKey: string;
  noDataMessageKey: string;
};