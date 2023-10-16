import React, { useState } from "react";
import { ListItem, ListItemText } from "@mui/material";
import {
  IncomesContainer,
  ListContainer,
  InputField,
  AddButton,
  IncomeNameAutocomplete,
} from "./styles";
import { useTranslation } from "react-i18next";
import { useIncomeCategories } from "@components/Settings/hooks/useIncomeCategories";
import { useIncomeList } from "./hooks/useIncomesList";
import { useCreateIncome } from "./hooks/useIncomeCreate";
import { ICategory } from "@components/Settings/types";

const Incomes = () => {
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const { t } = useTranslation("main-page");
  const { incomeCategories } = useIncomeCategories();
  const { incomeList } = useIncomeList();
  const { addIncome } = useCreateIncome();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleCategoryChange = (
    event: React.SyntheticEvent,
    value: ICategory | null
  ) => {
    setSelectedCategory(value);

    if (value && incomeList.some((income) => income.name === value.name)) {
      const lastIncome = incomeList.find(
        (income) => income.name === value.name
      );
      if (lastIncome) {
        setAmount(lastIncome.amount.toString());
      }
    } else {
      setAmount("");
    }
  };

  const handleAddIncome = () => {
    if (selectedCategory && amount) {
      const categoryId = selectedCategory.id;

      addIncome(parseFloat(amount), selectedCategory.name, categoryId);
      setAmount("");
      setSelectedCategory(null);
    }
  };

  const sortedIncomeList = [...incomeList].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return (
    <IncomesContainer>
      <ListContainer>
        <IncomeNameAutocomplete
          options={incomeCategories || []}
          getOptionLabel={(option: any) => option.name}
          value={selectedCategory}
          onChange={(event: React.SyntheticEvent, value: unknown) => {
            const selectedValue = value as ICategory | null;
            handleCategoryChange(event, selectedValue);
          }}
          renderInput={(params) => (
            <InputField
              label={t("incomes.incomeNameLabel")}
              variant="outlined"
              inputLabelProps={{ children: t("incomes.incomeNameLabel") }}
              {...params}
            />
          )}
        />
        <InputField
          label={t("incomes.amountLabel")}
          variant="outlined"
          fullWidth
          value={amount}
          onChange={handleAmountChange}
        />

        <AddButton
          variant="contained"
          color="primary"
          onClick={handleAddIncome}
        >
          {t("incomes.addIncomeButton")}
        </AddButton>
        <ListItemText primary={t("incomes.previousIncomesLabel")} />
        <ListContainer>
          {sortedIncomeList.map((income, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={income.name}
                secondary={`$${income.amount}`}
              />
              {income.date}
            </ListItem>
          ))}
        </ListContainer>
      </ListContainer>
    </IncomesContainer>
  );
};

export default Incomes;
