import { useState, ChangeEvent } from "react";
import { Container, TextField, Grid, Typography } from "@mui/material";
import { PieChart } from "react-minimal-pie-chart";
import { Income, Payment } from "./types";
import { useTranslation } from "react-i18next";

const Charts = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [incomesData, setIncomesData] = useState<Income[]>([
    { title: "Income 1", value: 220, color: "#E38627" }, // Оставил пока для примера
    { title: "Income 2", value: 150, color: "#C13C37" },
  ]);
  const [paymentsData, setPaymentsData] = useState<Payment[]>([
    { title: "Payment 1", value: 100, color: "#6A2135" },
    { title: "Payment 2", value: 75, color: "#FF5733" },
  ]);

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const { t } = useTranslation("main-page");

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            {t("charts.incomesTitle")}
          </Typography>
          {incomesData.length > 0 ? (
            <PieChart
              data={incomesData}
              radius={42}
              lineWidth={15}
              label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
              labelStyle={{
                fontSize: "8px",
              }}
              animate
            />
          ) : (
            <Typography>{t("charts.noDataMessage")}</Typography>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            {t("charts.paymentsTitle")}
          </Typography>
          {paymentsData.length > 0 ? (
            <PieChart
              data={paymentsData}
              radius={42}
              lineWidth={15}
              label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
              labelStyle={{
                fontSize: "8px",
              }}
              animate
            />
          ) : (
            <Typography>{t("charts.noDataMessage")}</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Charts;
