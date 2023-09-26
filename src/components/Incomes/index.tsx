import { useState } from "react";
import { ListItem, ListItemText } from "@mui/material";
import {
  IncomesContainer,
  ListContainer,
  InputField,
  AddButton,
  IncomeNameAutocomplete,
} from "./styles";
import { useTranslation } from "react-i18next";

const predefinedIncomeNames = ["Income Option 1"]; // Оставил для проверки
const incomes = [{ name: "Income 1", amount: 100 }];

const Incomes = () => {
  const [amount, setAmount] = useState("");
  const [incomeName, setIncomeName] = useState("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  const { t } = useTranslation("main-page");

  return (
    <IncomesContainer>
      <ListContainer>
        <IncomeNameAutocomplete
          options={predefinedIncomeNames}
          value={incomeName}
          onChange={(_, newValue) => setIncomeName(newValue as string)}
          renderInput={(params) => (
            <InputField
              label={t('incomes.incomeNameLabel')}
              variant="outlined"
              onChange={(e) => setIncomeName(e.target.value)}
              {...params}
            />
          )}
        />
        <InputField
          label={t('incomes.amountLabel')}
          variant="outlined"
          fullWidth
          value={amount}
          onChange={handleAmountChange}
        />

        <AddButton variant="contained" color="primary">
          {t('incomes.addIncomeButton')}
        </AddButton>
        <ListItemText primary={t('incomes.previousIncomesLabel')} />
        <ListContainer>
          {incomes.map((income, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={income.name}
                secondary={`$${income.amount}`}
              />
            </ListItem>
          ))}
        </ListContainer>
      </ListContainer>
    </IncomesContainer>
  );
};

export default Incomes;
