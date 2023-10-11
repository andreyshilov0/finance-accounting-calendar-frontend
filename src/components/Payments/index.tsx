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
import { usePaymentCategories } from "@components/Settings/hooks/usePaymentCategories";
import { useCreatePayment } from "./hooks/usePaymentCreate";
import { usePaymentList } from "./hooks/usePaymentsList";

const Payments = () => {
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const { paymentCategories } = usePaymentCategories();
  const { paymentList } = usePaymentList();
  const { addPayment } = useCreatePayment();
  const { t } = useTranslation("main-page");
  console.log(paymentList)

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleCategoryChange = (event: any, value: any) => {
    setSelectedCategory(value);
  };

  const handleAddPayment = () => {
    if (selectedCategory && amount) {
      const categoryId = parseInt(selectedCategory.id, 10);

      addPayment(parseFloat(amount), selectedCategory.name, categoryId);

      setAmount("");
      setSelectedCategory(null);
    }
  };
  return (
    <PaymentsContainer>
      <ListContainer>
        <PaymentNameAutocomplete
          options={paymentCategories || []}
          getOptionLabel={(option) => option.name}
          value={selectedCategory}
          onChange={handleCategoryChange}
          renderInput={(params) => (
            <InputField
              label={t("payments.paymentNameLabel")}
              variant="outlined"
              {...params}
            />
          )}
        />
        <InputField
          label={t("payments.amountLabel")}
          variant="outlined"
          fullWidth
          value={amount}
          onChange={handleAmountChange}
        />

        <AddButton
          variant="contained"
          color="primary"
          onClick={handleAddPayment}
        >
          {t("payments.addPaymentButton")}
        </AddButton>
        <ListItemText primary={t("payments.previousPaymentsLabel")} />
        <ListContainer>
          {paymentList.map((payment, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={payment.name}
                secondary={`$${payment.amount}`}
              />
              {payment.date}
            </ListItem>
          ))}
        </ListContainer>
      </ListContainer>
    </PaymentsContainer>
  );
};

export default Payments;
