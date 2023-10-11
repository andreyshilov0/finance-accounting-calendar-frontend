import { gql, useMutation } from "@apollo/client";
import { PAYMENT_CATEGORIES } from "./usePaymentCategories";
import { IUseCategoryMutationCreate } from "../types";

const PAYMENT_CATEGORY_CREATE = gql`
  mutation createPaymentCategory($name: String!) {
    createPaymentCategory(input: { name: $name }) {
      category {
        id
        name
      }
    }
  }
`;

export const usePaymentCategoryCreate = () => {
  const [createPaymentCategory, { loading, error, data }] =
    useMutation<IUseCategoryMutationCreate>(PAYMENT_CATEGORY_CREATE, {
      refetchQueries: [{ query: PAYMENT_CATEGORIES }],
    });

  const addPaymentCategoryByName = (name: string) => {
    createPaymentCategory({
      variables: {
        name,
      },
    }).catch((error) => {
      console.error(error);
    });
  };
  return { addPaymentCategoryByName, loading, error, data };
};
