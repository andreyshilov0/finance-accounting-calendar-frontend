import { useState } from "react";
import { ListItem, ListItemText } from "@mui/material";
import {
  PaymentsContainer,
  ListContainer,
  InputField,
  AddButton,
  PaymentNameAutocomplete,
} from "./styles";
import { useTranslation } from "react-i18next";

const predefinedPaymentNames = ["Payment Option 1"]; // Оставил всё что ниже пока для проверки
const payments = [{ name: "Payment 1", amount: 100 }];

const Payments = () => {
  const [amount, setAmount] = useState("");
  const [paymentName, setPaymentName] = useState("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  const { t } = useTranslation("main-page");
  return (
    <PaymentsContainer>
      <ListContainer>
        {/* <PaymentNameAutocomplete
          options={predefinedPaymentNames}
          value={paymentName}
          onChange={(_, newValue) => setPaymentName(newValue as string)}
          renderInput={(params) => (
            <InputField
              label={t("payments.paymentNameLabel")}
              variant="outlined"
              onChange={(e) => setPaymentName(e.target.value)}
              {...params}
            />
          )}
        /> */}
        <InputField
          label={t("payments.amountLabel")}
          variant="outlined"
          fullWidth
          value={amount}
          onChange={handleAmountChange}
        />

        <AddButton variant="contained" color="primary">
          {t("payments.addPaymentButton")}
        </AddButton>
        <ListItemText primary={t("payments.previousPaymentsLabel")} />
        <ListContainer>
          {payments.map((payment, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={payment.name}
                secondary={`$${payment.amount}`}
              />
            </ListItem>
          ))}
        </ListContainer>
      </ListContainer>
    </PaymentsContainer>
  );
};

export default Payments;
