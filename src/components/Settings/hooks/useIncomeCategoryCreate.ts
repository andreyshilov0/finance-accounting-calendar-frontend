import { gql, useMutation } from "@apollo/client";
import { INCOME_CATEGORIES } from "./useIncomeCategories";

const INCOME_CATEGORY_CREATE = gql`
  mutation createIncomeCategory($name: String!) {
    createIncomeCategory(input: { name: $name }) {
      category {
        id
        name
      }
    }
  }
`;

export const useIncomeCategoryCreate = () => {
  const [createIncomeCategory, { loading, error, data }] = useMutation(
    INCOME_CATEGORY_CREATE,
    { refetchQueries: [{ query: INCOME_CATEGORIES }] }
  );

  const addIncomeCategoryByName = (name: string) => {
    createIncomeCategory({
      variables: {
        name,
      },
    }).catch((error) => {
      console.error(error);
    });
  };
  return { addIncomeCategoryByName, loading, error, data };
};
