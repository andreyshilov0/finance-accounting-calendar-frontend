import { gql, useQuery } from "@apollo/client";

export const PAYMENT_LIST = gql`
  query PaymentList {
    userPayments {
      id
      amount
      name
      date
    }
  }
`;

export const usePaymentList = () => {
  const { loading, error, data } = useQuery(PAYMENT_LIST);

  const paymentList = data?.userPayments || [];
  return { loading, error, paymentList };
};
