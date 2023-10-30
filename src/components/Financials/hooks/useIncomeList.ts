import { gql, useQuery } from "@apollo/client";
import { IUseIncomeQuery } from "../types";

export const INCOME_LIST = gql`
  query IncomeList($page: Int, $perPage: Int, $monthYear: String!) {
    userIncomes(page: $page, perPage: $perPage, monthYear: $monthYear) {
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

export const useIncomeList = ({
  page,
  perPage = 7,
  monthYear,
}: {
  page?: number;
  perPage?: number;
  monthYear?: string;
}) => {
  const { loading, error, data } = useQuery<IUseIncomeQuery>(INCOME_LIST, {
    variables: { page, perPage, monthYear },
  });

  const incomeList = data?.userIncomes || [];
  return { loading, error, incomeList };
};
