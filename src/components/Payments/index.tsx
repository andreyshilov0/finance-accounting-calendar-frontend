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
import { ICategory } from "@components/Settings/types";

const Payments = () => {
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const { paymentCategories } = usePaymentCategories();
  const { paymentList } = usePaymentList();
  const { addPayment } = useCreatePayment();
  const { t } = useTranslation("main-page");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleCategoryChange = (
    event: React.SyntheticEvent,
    value: ICategory | null
  ) => {
    setSelectedCategory(value);

    if (value && paymentList.some((payment) => payment.name === value.name)) {
      const lastPayment = paymentList.find(
        (payment) => payment.name === value.name
      );
      if (lastPayment) {
        setAmount(lastPayment.amount.toString());
      }
    } else {
      setAmount("");
    }
  };

  const handleAddPayment = () => {
    if (selectedCategory && amount) {
      const categoryId = selectedCategory.id;

      addPayment(parseFloat(amount), selectedCategory.name, categoryId);

      setAmount("");
      setSelectedCategory(null);
    }
  };

  const sortedPaymentList = [...paymentList].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
  return (
    <PaymentsContainer>
      <ListContainer>
        <PaymentNameAutocomplete
          options={paymentCategories || []}
          getOptionLabel={(option: any) => option.name}
          value={selectedCategory}
          onChange={(event: React.SyntheticEvent, value: unknown) => {
            const selectedValue = value as ICategory | null;
            handleCategoryChange(event, selectedValue);
          }}
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
          {sortedPaymentList.map((payment, index) => (
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
