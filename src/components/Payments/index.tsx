import { useState } from "react";
import { ListItem, ListItemText } from "@mui/material";
import {
  PaymentsContainer,
  ListContainer,
  InputField,
  AddButton,
  PaymentNameAutocomplete,
} from "./styles";

const predefinedPaymentNames = ["Payment Option 1"]; // Оставил для проверки
const payments = [{ name: "Payment 1", amount: 100 }]; // Оставил для проверки

const Payments = () => {
  const [amount, setAmount] = useState("");
  const [paymentName, setPaymentName] = useState("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  return (
    <PaymentsContainer>
      <ListContainer>
        <PaymentNameAutocomplete
          options={predefinedPaymentNames}
          value={paymentName}
          onChange={(_, newValue) => setPaymentName(newValue as string)}
          renderInput={(params) => (
            <InputField
              label="Payment Name"
              variant="outlined"
              onChange={(e) => setPaymentName(e.target.value)}
              {...params}
            />
          )}
        />
        <InputField
          label="Amount"
          variant="outlined"
          fullWidth
          value={amount}
          onChange={handleAmountChange}
        />

        <AddButton variant="contained" color="primary">
          Add Payment
        </AddButton>
        <ListItemText primary="Previous Payments: " />
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
