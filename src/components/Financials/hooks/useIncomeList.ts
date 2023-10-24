import { gql, useQuery } from "@apollo/client";
import { IUseIncomeQuery } from "../types";

export const INCOME_LIST = gql`
  query IncomeList {
    userIncomes {
      id
      amount
      name
      date
      incomeCategory {
        id
        name
      }
    }
  }
`;

export const useIncomeList = () => {
  const { loading, error, data } = useQuery<IUseIncomeQuery>(INCOME_LIST);

  const incomeList = data?.userIncomes || [];
  return { loading, error, incomeList };
};
