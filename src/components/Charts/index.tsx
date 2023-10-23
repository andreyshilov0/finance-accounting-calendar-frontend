import { useState, ChangeEvent, useMemo } from "react";
import { Container, TextField, Grid, Typography } from "@mui/material";
import { PieChart } from "react-minimal-pie-chart";
import { useTranslation } from "react-i18next";
import { useIncomeList } from "@components/Incomes/hooks/useIncomesList";
import { usePaymentList } from "@components/Payments/hooks/usePaymentsList";
import { ChartContainer, ChartSection } from "./style";
import { ChartItem } from "./types";
import { IIncome } from "@components/Incomes/types";
import { IPayment } from "@components/Payments/types";

const Charts = () => {
  const { incomeList } = useIncomeList();
  const { paymentList } = usePaymentList();
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const { t } = useTranslation("main-page");

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const filteredIncomeList = useMemo(() => {
    return incomeList?.filter(
      (income) => income.date.slice(0, 7) === selectedDate.slice(0, 7)
    );
  }, [incomeList, selectedDate]);

  const filteredPaymentList = useMemo(() => {
    return paymentList?.filter((payment) => {
      return payment.date.slice(0, 7) === selectedDate.slice(0, 7);
    });
  }, [paymentList, selectedDate]);

  console.log(filteredPaymentList)

  const generateChartData = (
    list: ChartItem[],
    categoryKey: "incomeCategory" | "paymentCategory",
    defaultColor: string
  ): {
    title: string;
    value: number;
    color: string;
  }[] => {
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

  const incomeData = generateChartData(
    filteredIncomeList,
    "incomeCategory",
    "#4CAF50"
  );
  const paymentData = generateChartData(
    filteredPaymentList,
    "paymentCategory",
    "#FF0000"
  );

  const calculateTotal = (list: ChartItem[] = []) => {
    return list.reduce((total, item) => total + item.amount, 0);
  };

  const totalIncome = calculateTotal(filteredIncomeList);
  const totalPayments = calculateTotal(filteredPaymentList);
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
            <Typography variant="h6" gutterBottom>
              {t("charts.incomesTitle")}
            </Typography>
            {filteredIncomeList && filteredPaymentList ? (
              <>
                <PieChart
                  data={incomeData}
                  radius={50}
                  lineWidth={28}
                  label={({ dataEntry }) =>
                    `${Math.round(dataEntry.percentage)}%`
                  }
                  labelStyle={{ fontSize: "4px" }}
                  animate
                />
                <Typography>
                  {t("charts.totalIncome")}: {totalIncome}
                </Typography>
              </>
            ) : (
              <Typography>{t("charts.loading")}...</Typography>
            )}
          </ChartSection>

          <ChartSection>
            <Typography variant="h6" gutterBottom>
              {t("charts.paymentsTitle")}
            </Typography>
            {filteredIncomeList && filteredPaymentList ? (
              <>
                <PieChart
                  data={paymentData}
                  radius={50}
                  lineWidth={28}
                  label={({ dataEntry }) =>
                    `${Math.round(dataEntry.percentage)}%`
                  }
                  labelStyle={{ fontSize: "4px" }}
                  animate
                />
                <Typography>
                  {t("charts.totalPayments")}: {totalPayments}
                </Typography>
                <Typography>
                  {t("charts.balance")}: {isPositiveBalance ? "+" : "-"}$
                  {Math.abs(balance)}
                </Typography>
              </>
            ) : (
              <Typography>{t("charts.loading")}...</Typography>
            )}
          </ChartSection>
        </ChartContainer>
      </Grid>
    </Container>
  );
};

export default Charts;
