import { gql, useQuery } from "@apollo/client";
import { IUseCategoryQuery } from "../types";

export const INCOME_CATEGORIES = gql`
  query IncomeCategories {
    incomeCategories {
      id
      name
    }
  }
`;

export const useIncomeCategories = () => {
  const { loading, error, data } = useQuery<IUseCategoryQuery>(INCOME_CATEGORIES);

  const incomeCategories = data?.incomeCategories;
  return { loading, error, incomeCategories };
};
