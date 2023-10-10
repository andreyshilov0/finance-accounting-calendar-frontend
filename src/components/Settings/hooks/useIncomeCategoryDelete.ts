import { gql, useMutation } from "@apollo/client";
import { INCOME_CATEGORIES } from "./useIncomeCategories";

const DELETE_INCOME_CATEGORY = gql`
  mutation deleteIncomeCategory($categoryId: ID!) {
    deleteIncomeCategory(input: { categoryId: $categoryId }) {
      success
    }
  }
`;

export const useIncomeCategoryDelete = () => {
  const [deleteIncomeCategory, { loading, error, data }] = useMutation(
    DELETE_INCOME_CATEGORY,
    { refetchQueries: [{ query: INCOME_CATEGORIES }] }
  );

  const removeIncomeCategory = async (categoryId: number) => {
    try {
      const response = await deleteIncomeCategory({
        variables: {
          categoryId,
        },
      });

      return response.data?.deleteIncomeCategory.success;
    } catch (error) {
      console.error(error);

      return false;
    }
  };

  return { removeIncomeCategory, loading, error, data };
};
