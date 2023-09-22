import { gql, useMutation } from "@apollo/client";
import { ISignInUserMutation } from "../types";
import { useTranslation } from "react-i18next";
import client from "apollo/client";

const SIGN_IN = gql`
  mutation SignInUser($email: String!, $password: String!) {
    signInUser(input: { email: $email, password: $password }) {
      token
      user {
        id
        email
      }
    }
  }
`;

const useSignIn = () => {
  const { t } = useTranslation();
  const [signInUser, { loading, error }] = useMutation<ISignInUserMutation>(
    SIGN_IN,
    { client }
  );

  const signIn = async (email: string, password: string) => {
    try {
      const response = await signInUser({
        variables: { email, password },
      });

      if (!response.data) {
        return {
          error: t("navBar.unprocessableEntity"),
          token: "",
          user: null,
        };
      }

      const { token, user } = response.data.signInUser;

      localStorage.setItem("jwtToken", token);

      return { token, user, error: null };
    } catch (error) {
      return { error: t("noValidEmailOrPassword"), token: "", user: null };
    }
  };

  return { loading, error, signIn };
};

export default useSignIn;