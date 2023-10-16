import { gql, useMutation } from "@apollo/client";
import { PAYMENT_LIST } from "./usePaymentsList";
import { IUsePaymentMutationCreate } from "../types";

const CREATE_PAYMENT = gql`
  mutation createPayment(
    $amount: Float!
    $name: String!
    $paymentCategoryId: ID!
  ) {
    createPayment(
      input: {
        amount: $amount
        name: $name
        paymentCategoryId: $paymentCategoryId
      }
    ) {
      payment {
        id
        amount
        name
      }
    }
  }
`;

export const useCreatePayment = () => {
  const [createPayment, { loading, error, data }] = useMutation<IUsePaymentMutationCreate>(
    CREATE_PAYMENT,
    {
      refetchQueries: [{ query: PAYMENT_LIST }],
    }
  );

  const addPayment = async (
    amount: number,
    name: string,
    paymentCategoryId: number
  ): Promise<void> => {
    try {
      await createPayment({
        variables: {
          amount,
          name,
          paymentCategoryId,
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { addPayment, loading, error, data };
};
