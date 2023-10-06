import { AppBar, Toolbar } from "@mui/material";
import LanguageButton from "@components/LanguageButton";
import { useTranslation } from "react-i18next";

function NavBar() {
  const { i18n } = useTranslation();
  return (
    <AppBar position="static">
      <Toolbar>
        <LanguageButton changeLanguage={i18n.changeLanguage} />
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
