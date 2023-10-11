import { gql, useQuery } from "@apollo/client";
import { IUseCategoryQuery } from "../types";

export const PAYMENT_CATEGORIES = gql`
  query PaymentCategories {
    paymentCategories {
      id
      name
    }
  }
`;

export const usePaymentCategories = () => {
  const { loading, error, data } = useQuery<IUseCategoryQuery>(PAYMENT_CATEGORIES);

  const paymentCategories = data?.paymentCategories;
  return { loading, error, paymentCategories };
};
