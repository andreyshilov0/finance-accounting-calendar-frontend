import { gql, useMutation } from "@apollo/client";
import { PAYMENT_CATEGORIES } from "./usePaymentCategories";

const DELETE_PAYMENT_CATEGORY = gql`
  mutation deletePaymentCategory($categoryId: ID!) {
    deletePaymentCategory(input: { categoryId: $categoryId }) {
      success
    }
  }
`;

export const usePaymentCategoryDelete = () => {
  const [deletePaymentCategory, { loading, error, data }] = useMutation(
    DELETE_PAYMENT_CATEGORY,
    { refetchQueries: [{ query: PAYMENT_CATEGORIES }] }
  );

  const removePaymentCategory = async (categoryId: number) => {
    try {
      const response = await deletePaymentCategory({
        variables: {
          categoryId,
        },
      });

      return response.data?.deletePaymentCategory.success;
    } catch (error) {
      console.error(error);

      return false;
    }
  };

  return { removePaymentCategory, loading, error, data };
};
