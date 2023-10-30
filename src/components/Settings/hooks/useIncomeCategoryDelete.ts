import { gql, useMutation } from "@apollo/client";
import { INCOME_CATEGORIES } from "./useIncomeCategories";
import { IUseCategoryMutationDelete } from "../types";

const DELETE_INCOME_CATEGORY = gql`
  mutation deleteIncomeCategory($categoryId: ID!) {
    deleteIncomeCategory(input: { categoryId: $categoryId }) {
      success
    }
  }
`;

export const useIncomeCategoryDelete = () => {
  const [deleteIncomeCategory, { loading, error, data }] =
    useMutation<IUseCategoryMutationDelete>(DELETE_INCOME_CATEGORY, {
      refetchQueries: [{ query: INCOME_CATEGORIES }],
    });

  const removeIncomeCategory = async (categoryId: number): Promise<boolean> => {
    try {
      const response = await deleteIncomeCategory({
        variables: {
          categoryId,
        },
      });

      return response.data?.removeIncomeCategory || false;
    } catch (error) {
      console.error(error);

      return false;
    }
  };

  return { removeIncomeCategory, loading, error, data };
};
