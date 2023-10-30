import { gql, useMutation } from "@apollo/client";
import { INCOME_LIST } from "./useIncomeList";
import { IUseIncomeMutationCreate } from "../types";

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
  const [createIncome, { loading, error, data }] =
    useMutation<IUseIncomeMutationCreate>(CREATE_INCOME, {
      refetchQueries: [{ query: INCOME_LIST }],
    });

  const addIncome = async (
    amount: number,
    name: string,
    incomeCategoryId: number
  ): Promise<void> => {
    try {
      await createIncome({
        variables: {
          amount,
          name,
          incomeCategoryId,
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { addIncome, loading, error, data };
};
