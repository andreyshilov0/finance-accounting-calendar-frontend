import { ChangeEvent } from "react";
import { Container, TextField, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ChartContainer, ChartSection } from "./style";
import { ChartsProps } from "./types";
import ChartSectionComponent from "@components/ChartSectionComponent";

const Charts: React.FC<ChartsProps> = ({
  totalIncome,
  totalPayment,
  onDateChange,
  selectedDate,
  incomeData,
  paymentData,
}) => {
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    onDateChange(newDate);
  };
  const { t } = useTranslation("main-page");

  const balance = totalIncome - totalPayment;
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
              total={totalPayment}
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
