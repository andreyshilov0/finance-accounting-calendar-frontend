import { gql, useQuery } from "@apollo/client";

export const INCOME_LIST = gql`
  query IncomeList {
    userIncomes {
      id
      amount
      name
      date
    }
  }
`;

export const useIncomeList = () => {
  const { loading, error, data } = useQuery(INCOME_LIST);

  const incomeList = data?.userIncomes || [];
  return { loading, error, incomeList };
};
