import { gql, useQuery } from "@apollo/client";

export const PAYMENT_CATEGORIES = gql`
  query PaymentCategories {
    paymentCategories {
      id
      name
    }
  }
`;

export const usePaymentCategories = () => {
  const { loading, error, data } = useQuery(PAYMENT_CATEGORIES);

  const paymentCategories = data?.paymentCategories;
  return { loading, error, paymentCategories };
};
