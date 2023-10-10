import { gql, useMutation } from "@apollo/client";

const UPDATE_INCOME_CATEGORY_NAME = gql`
  mutation updateIncomeCategoryName($categoryId: ID!, $newName: String!) {
    updateIncomeCategoryName(
      input: { categoryId: $categoryId, newName: $newName }
    ) {
      category {
        id
        name
      }
    }
  }
`;

export const useIncomeCategoryEdit = () => {
  const [updateIncomeCategoryName, { loading, error, data }] = useMutation(
    UPDATE_INCOME_CATEGORY_NAME
  );

  const editIncomeCategoryName = async (
    categoryId: number,
    newName: string
  ) => {
    try {
      const response = await updateIncomeCategoryName({
        variables: {
          categoryId,
          newName,
        },
      });

      return response.data?.updateIncomeCategoryName?.category;
    } catch (error) {
      console.error(error);

      return null;
    }
  };

  return { editIncomeCategoryName, loading, error, data };
};
