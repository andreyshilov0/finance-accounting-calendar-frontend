import { gql, useMutation } from "@apollo/client";

const UPDATE_PAYMENT_CATEGORY_NAME = gql`
  mutation updatePaymentCategoryName($categoryId: ID!, $newName: String!) {
    updatePaymentCategoryName(
      input: { categoryId: $categoryId, newName: $newName }
    ) {
      category {
        id
        name
      }
    }
  }
`;

export const usePaymentCategoryEdit = () => {
  const [updatePaymentCategoryName, { loading, error, data }] = useMutation(
    UPDATE_PAYMENT_CATEGORY_NAME
  );

  const editPaymentCategoryName = async (
    categoryId: number,
    newName: string
  ) => {
    try {
      const response = await updatePaymentCategoryName({
        variables: {
          categoryId,
          newName,
        },
      });

      return response.data?.updatePaymentCategoryName?.category;
    } catch (error) {
      console.error(error);

      return null;
    }
  };

  return { editPaymentCategoryName, loading, error, data };
};
