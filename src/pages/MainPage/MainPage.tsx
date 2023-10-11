import React, { useState } from "react";
import { Tab, TabPanel, Tabs } from "react-tabs";
import Payments from "@components/Payments";
import Incomes from "@components/Incomes";
import Charts from "@components/Charts";
import Settings from "@components/Settings";
import { MainPageContainer, TabButton, TabListWrapper } from "./styles";
import { useTranslation } from "react-i18next";

const MainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };
  const { t } = useTranslation("main-page");
  return (
    <MainPageContainer>
      <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
        <TabListWrapper>
          <Tab>
            <TabButton>{t("charts.incomesTitle")}</TabButton>
          </Tab>
          <Tab>
            <TabButton>{t("charts.paymentsTitle")}</TabButton>
          </Tab>
          <Tab>
            <TabButton>{t("charts.chartsTitle")}</TabButton>
          </Tab>
          <Tab>
            <TabButton>{t("charts.settingsTitle")}</TabButton>
          </Tab>
        </TabListWrapper>
        <hr />
        <TabPanel>
          <Incomes />
        </TabPanel>
        <TabPanel>
          <Payments />
        </TabPanel>
        <TabPanel>
          <Charts />
        </TabPanel>
        <TabPanel>
          <Settings />
        </TabPanel>
      </Tabs>
    </MainPageContainer>
  );
};

export default MainPage;
