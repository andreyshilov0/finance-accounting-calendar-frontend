import React from "react";
import { SettingsContainer } from "./styles";
import SettingsIncomeContainer from "@components/SettingsIncomeContainer";
import SettingsPaymentContainer from "@components/SettingsPaymentContainer";

const Settings: React.FC = () => {
  return (
    <SettingsContainer>
      <SettingsIncomeContainer />
      <SettingsPaymentContainer />
    </SettingsContainer>
  );
};

export default Settings;
