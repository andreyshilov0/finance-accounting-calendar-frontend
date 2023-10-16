import { useState, ChangeEvent, useMemo } from "react";
import { Container, TextField, Grid, Typography } from "@mui/material";
import { PieChart } from "react-minimal-pie-chart";
import { useTranslation } from "react-i18next";
import { useIncomeList } from "@components/Incomes/hooks/useIncomesList";
import { usePaymentList } from "@components/Payments/hooks/usePaymentsList";
import { ChartContainer, ChartSection } from "./style";

const Charts = () => {
  const { incomeList } = useIncomeList();
  const { paymentList } = usePaymentList();
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

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

  const generateIncomeData = () => {
    const incomeData = filteredIncomeList.map((income) => ({
      title: income.incomeCategory?.name || t("charts.deletedCategory"),
      value: income.amount,
      color: income.incomeCategory ? "#4CAF50" : "#A9A9A9",
    }));

    return incomeData.filter((data) => data.value > 0);
  };

  const generatePaymentData = () => {
    const paymentData = filteredPaymentList.map((payment) => ({
      title: payment.paymentCategory?.name || t("charts.deletedCategory"),
      value: payment.amount,
      color: payment.paymentCategory ? "#FF0000" : "#A9A9A9",
    }));

    return paymentData.filter((data) => data.value > 0);
  };

  const totalIncome = (filteredIncomeList || []).reduce(
    (total, income) => total + income.amount,
    0
  );
  const totalPayments = (filteredPaymentList || []).reduce(
    (total, payment) => total + payment.amount,
    0
  );
  const balance = totalIncome - totalPayments;
  const isPositiveBalance = balance >= 0;

  const { t } = useTranslation("main-page");

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
                  data={generateIncomeData()}
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
                  data={generatePaymentData()}
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
