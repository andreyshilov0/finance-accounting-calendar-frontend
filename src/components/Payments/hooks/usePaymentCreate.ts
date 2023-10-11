import { gql, useMutation } from "@apollo/client";
import { PAYMENT_LIST } from "./usePaymentsList";

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
  const [createPayment, { loading, error, data }] = useMutation(
    CREATE_PAYMENT,
    {
      refetchQueries: [{ query: PAYMENT_LIST }],
    }
  );

  const addPayment = (
    amount: number,
    name: string,
    paymentCategoryId: number
  ) => {
    return createPayment({
      variables: {
        amount,
        name,
        paymentCategoryId,
      },
    }).catch((error) => {
      console.error(error);
    });
  };

  return { addPayment, loading, error, data };
};
