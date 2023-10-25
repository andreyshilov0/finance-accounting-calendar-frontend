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
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const slicedDate = selectedDate.slice(0, 7);
  const [incomePage, setIncomePage] = useState(1);
  const [paymentPage, setPaymentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const { paymentCategories } = usePaymentCategories();
  const { paymentList } = usePaymentList({
    page: paymentPage,
    monthYear: slicedDate ? slicedDate : undefined,
  });

  const { addPayment } = useCreatePayment();
  const { incomeCategories } = useIncomeCategories();
  const { incomeList } = useIncomeList({
    page: incomePage,
    monthYear: slicedDate ? slicedDate : undefined,
  });
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
            financialsCategories={incomeCategories ?? []}
            financialsList={incomeList}
            financialsAdd={addIncome}
            financialsType="incomes"
            currentPage={incomePage}
            setPage={setIncomePage}
          />
        </TabPanel>
        <TabPanel>
          <Financials
            financialsCategories={paymentCategories ?? []}
            financialsList={paymentList}
            financialsAdd={addPayment}
            financialsType="payments"
            currentPage={paymentPage}
            setPage={setPaymentPage}
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
