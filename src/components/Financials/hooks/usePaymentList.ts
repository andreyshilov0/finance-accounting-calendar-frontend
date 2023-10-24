import { gql, useQuery } from "@apollo/client";
import { IUsePaymentQuery } from "../types";

export const PAYMENT_LIST = gql`
  query PaymentList {
    userPayments {
      id
      amount
      name
      date
      paymentCategory {
        id
        name
      }
    }
  }
`;

export const usePaymentList = () => {
  const { loading, error, data } = useQuery<IUsePaymentQuery>(PAYMENT_LIST);

  const paymentList = data?.userPayments || [];
  return { loading, error, paymentList };
};
