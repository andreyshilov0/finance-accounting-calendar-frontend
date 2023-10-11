import { gql, useMutation } from "@apollo/client";
import { INCOME_LIST } from "./useIncomesList";

const CREATE_INCOME = gql`
  mutation createIncome(
    $amount: Float!
    $name: String!
    $incomeCategoryId: ID!
  ) {
    createIncome(
      input: {
        amount: $amount
        name: $name
        incomeCategoryId: $incomeCategoryId
      }
    ) {
      income {
        id
        amount
        name
      }
    }
  }
`;

export const useCreateIncome = () => {
  const [createIncome, { loading, error, data }] = useMutation(CREATE_INCOME, {
    refetchQueries: [{ query: INCOME_LIST }],
  });

  const addIncome = (
    amount: number,
    name: string,
    incomeCategoryId: number
  ) => {
    return createIncome({
      variables: {
        amount,
        name,
        incomeCategoryId,
      },
    }).catch((error) => {
      console.error(error);
    });
  };

  return { addIncome, loading, error, data };
};
