import { useState, ChangeEvent } from "react";
import { Container, TextField, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { usePaymentList, useIncomeList } from "@components/Financials/hooks";
import { ChartContainer, ChartSection } from "./style";
import { ChartItem } from "./types";
import { IIncome, IPayment } from "@components/Financials/types";
import ChartSectionComponent from "@components/ChartSectionComponent";

const Charts = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  const slicedDate = selectedDate.slice(0, 7);
  const { incomeList } = useIncomeList({
    monthYear: slicedDate ? slicedDate : undefined,
  });
  const { paymentList } = usePaymentList({
    monthYear: slicedDate ? slicedDate : undefined,
  });

  const { t } = useTranslation("main-page");

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const generateChartData = (
    list: ChartItem[],
    categoryKey: "incomeCategory" | "paymentCategory",
    defaultColor: string
  ) => {
    return list
      .map((item) => {
        const category =
          categoryKey === "incomeCategory"
            ? (item as IIncome).incomeCategory
            : (item as IPayment).paymentCategory;
        const hasCategory = category && category.name;
        return {
          title: hasCategory ? category.name : t("charts.deletedCategory"),
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
  const balance = totalIncome - totalPayments;
  const isPositiveBalance = balance >= 0;

  return (
    <Container>
      <Grid>
        <Grid>
          <TextField
            label={t("charts.selectDateLabel")}
            type="date"
            variant="outlined"
            fullWidth
            value={selectedDate}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <ChartContainer>
          <ChartSection>
            <ChartSectionComponent
              titleLocalesKey="charts.incomesTitle"
              data={incomeData}
              total={totalIncome}
              totalLocalesKey="charts.totalIncome"
              noDataMessageKey="charts.noDataMessage"
            />
          </ChartSection>

          <ChartSection>
            <ChartSectionComponent
              titleLocalesKey="charts.paymentsTitle"
              data={paymentData}
              total={totalPayments}
              totalLocalesKey="charts.totalPayments"
              noDataMessageKey="charts.noDataMessage"
            />
            <Typography>
              {t("charts.balance")}: {isPositiveBalance ? "+" : "-"}$
              {Math.abs(balance)}
            </Typography>
          </ChartSection>
        </ChartContainer>
      </Grid>
    </Container>
  );
};

export default Charts;
