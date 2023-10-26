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
import { ChartItem } from "@components/Charts/types";
import { CategoryKey, IIncome, IPayment } from "@components/Financials/types";

const MainPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const { t } = useTranslation("main-page");
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
  const handleChartsDateChange = (newDate: string) => {
    setSelectedDate(newDate);
  };

  const isIncome = (item: ChartItem): item is IIncome =>
    (item as IIncome).incomeCategory !== undefined;

  const isPayment = (item: ChartItem): item is IPayment =>
    (item as IPayment).paymentCategory !== undefined;

  const generateChartData = (
    list: ChartItem[],
    categoryKey: CategoryKey,
    defaultColor: string
  ) => {
    return list
      .map((item) => {
        const category =
          isIncome(item) && categoryKey === "incomeCategory"
            ? item.incomeCategory
            : isPayment(item) && categoryKey === "paymentCategory"
            ? item.paymentCategory
            : undefined;

        const hasCategory = category && category.name;
        return {
          title: hasCategory || t("charts.deletedCategory"),
          value: item.amount,
          color: hasCategory ? defaultColor : "#A9A9A9",
        };
      })
      .filter((data) => data.value > 0);
  };

  const incomeData = generateChartData(incomeList, "incomeCategory", "#4CAF50");
  const paymentData = generateChartData(
    paymentList,
    "paymentCategory",
    "#FF0000"
  );

  const calculateTotal = (list: ChartItem[] = []) => {
    return list.reduce((total, item) => total + item.amount, 0);
  };

  const totalIncome = calculateTotal(incomeList);
  const totalPayments = calculateTotal(paymentList);

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
          <Charts
            incomeList={incomeList}
            paymentList={paymentList}
            onDateChange={handleChartsDateChange}
            selectedDate={selectedDate}
            totalIncome={totalIncome}
            totalPayment={totalPayments}
            incomeData={incomeData}
            paymentData={paymentData}
          />
        </TabPanel>
        <TabPanel>
          <Settings />
        </TabPanel>
      </Tabs>
    </MainPageContainer>
  );
};

export default MainPage;
