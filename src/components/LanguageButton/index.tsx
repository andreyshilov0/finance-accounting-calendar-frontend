import { useState } from "react";
import { ButtonStyleWrapper } from "@components/AuthForm/styles";
import { LanguageButtonStyle } from "./styles";
import { ILanguageButton } from "./types";
import { LIST_LANGUAGES } from "constants/constants";

const LanguageButton = ({ changeLanguage }: ILanguageButton) => {
  const [activeLanguage, setActiveLanguage] = useState(
    localStorage.getItem("i18nextLng")
  );

  const handleLanguageChange = (language: string) => {
    changeLanguage(language);
    setActiveLanguage(language);
  };

  return (
    <ButtonStyleWrapper>
      {LIST_LANGUAGES.map((language) => (
        <LanguageButtonStyle
          key={language}
          onClick={() => handleLanguageChange(language)}
          active={activeLanguage === language}
        >
          {language}
        </LanguageButtonStyle>
      ))}
    </ButtonStyleWrapper>
  );
};

export default LanguageButton;
