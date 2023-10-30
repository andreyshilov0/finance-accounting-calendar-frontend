import { gql, useQuery } from "@apollo/client";
import { IUsePaymentQuery } from "../types";

export const PAYMENT_LIST = gql`
  query PaymentList($page: Int, $perPage: Int, $monthYear: String!) {
    userPayments(page: $page, perPage: $perPage, monthYear: $monthYear) {
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

export const usePaymentList = ({
  page,
  perPage = 7,
  monthYear,
}: {
  page?: number;
  perPage?: number;
  monthYear?: string;
}) => {
  const { loading, error, data } = useQuery<IUsePaymentQuery>(PAYMENT_LIST, {
    variables: { page, perPage, monthYear },
  });

  const paymentList = data?.userPayments || [];
  return { loading, error, paymentList };
};
