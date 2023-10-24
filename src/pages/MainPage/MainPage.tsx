import React, { useState } from "react";
import { Tab, TabPanel, Tabs } from "react-tabs";
import Charts from "@components/Charts";
import Settings from "@components/Settings";
import { MainPageContainer, TabButton, TabListWrapper } from "./styles";
import { useTranslation } from "react-i18next";
import {
  useCreateIncome,
  useCreatePayment,
  useIncomeList,
  usePaymentList,
} from "@components/Financials/hooks";
import {
  usePaymentCategories,
  useIncomeCategories,
} from "@components/Settings/hooks";
import Financials from "@components/Financials";

const MainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { paymentCategories } = usePaymentCategories();
  const { paymentList } = usePaymentList();
  const { addPayment } = useCreatePayment();
  const { incomeCategories } = useIncomeCategories();
  const { incomeList } = useIncomeList();
  const { addIncome } = useCreateIncome();

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
          <Financials
            categories={incomeCategories ?? []}
            list={incomeList}
            add={addIncome}
            type="incomes"
          />
        </TabPanel>
        <TabPanel>
          <Financials
            categories={paymentCategories ?? []}
            list={paymentList}
            add={addPayment}
            type="payments"
          />
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
