import { AppBar, Toolbar } from "@mui/material";
import LanguageButton from "@components/LanguageButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ButtonLogout } from "./styles";

const NavBar = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation("main-page");
  const navigate = useNavigate();
  const onLogoutClick = () => {
    navigate("/");
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <ButtonLogout variant="outlined" onClick={onLogoutClick}>
          {t("addButton.logoutButton")}
        </ButtonLogout>
        <LanguageButton changeLanguage={i18n.changeLanguage} />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
