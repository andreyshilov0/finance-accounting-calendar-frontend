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

const Incomes = () => {
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { t } = useTranslation("main-page");
  const { incomeCategories } = useIncomeCategories();
  const { incomeList } = useIncomeList();
  const { addIncome } = useCreateIncome();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleCategoryChange = (event: any, value: any) => {
    setSelectedCategory(value);
  };

  const handleAddIncome = () => {
    // Проверяем, что выбрана категория и введена сумма
    if (selectedCategory && amount) {
      // Преобразуем строку id в число
      const categoryId = parseInt(selectedCategory.id, 10);
      // Вызываем функцию для создания дохода, передавая id, название и введенную сумму
      addIncome(parseFloat(amount), selectedCategory.name, categoryId);
      // Очищаем поля после добавления дохода

      setAmount("");
      setSelectedCategory(null);
    }
  };

  return (
    <IncomesContainer>
      <ListContainer>
        <IncomeNameAutocomplete
          options={incomeCategories || []}
          getOptionLabel={(option) => option.name}
          value={selectedCategory}
          onChange={handleCategoryChange}
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
          {incomeList.map((income, index) => (
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
