import { useState } from "react";
import { Field, Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { AuthTextField, AuthPaper, AuthButton, ButtonPanel } from "./styles";
import { useTranslation } from "react-i18next";
import useSignIn from "./hooks/useSignIn";
import { IUserFormAuth } from "./types";

const AuthForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { signIn, loading } = useSignIn();
  const [errorAuth, setErrorAuth] = useState<string | null>(null);

  const onFormSubmit = async (data: IUserFormAuth) => {
    const { token, user, error } = await signIn(data.email, data.password);
    if (token && user) {
      navigate("/main");
    } else {
      setErrorAuth(error || t("anErrorOccurred"));
    }
  };

  return (
    <Form
      onSubmit={onFormSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <AuthPaper>
            <Field<string>
              name="email"
              render={({ input }) => (
                <AuthTextField {...input} label={t("userLoginLabel")} />
              )}
            />
            <Field<string>
              name="password"
              render={({ input }) => (
                <AuthTextField
                  {...input}
                  type="password"
                  label={t("userPasswordLabel")}
                />
              )}
            />
            <ButtonPanel>
              <AuthButton variant="contained" type="submit">
                {t("buttonLogin")}
              </AuthButton>
            </ButtonPanel>
            {loading && <div>Loading...</div>}
            {errorAuth && <div>{errorAuth}</div>}
          </AuthPaper>
        </form>
      )}
    />
  );
};

export default AuthForm;
