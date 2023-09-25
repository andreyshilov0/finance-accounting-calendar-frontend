import { useState } from "react";
import { ListItem, ListItemText } from "@mui/material";
import {
  IncomesContainer,
  ListContainer,
  InputField,
  AddButton,
  IncomeNameAutocomplete,
} from "./styles";

const predefinedIncomeNames = ["Income Option 1"]; // Оставил для проверки
const incomes = [{ name: "Income 1", amount: 100 }];

const Incomes = () => {
  const [amount, setAmount] = useState("");
  const [incomeName, setIncomeName] = useState("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  return (
    <IncomesContainer>
      <ListContainer>
        <IncomeNameAutocomplete
          options={predefinedIncomeNames}
          value={incomeName}
          onChange={(_, newValue) => setIncomeName(newValue as string)}
          renderInput={(params) => (
            <InputField
              label="Income Name"
              variant="outlined"
              onChange={(e) => setIncomeName(e.target.value)}
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
          Add Income
        </AddButton>
        <ListItemText primary="Previous Incomes: " />
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
