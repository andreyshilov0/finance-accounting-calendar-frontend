import React, { useState } from "react";
import { ListItem, ListItemText } from "@mui/material";
import {
  FinancialsContainer,
  ListContainer,
  AddButton,
  NameAutocomplete,
  StyledTextField,
} from "./styles";
import { useTranslation } from "react-i18next";
import { ICategory } from "@components/Settings/types";
import { FinancialsProps, IIncome, IPayment } from "./types";
import { Pagination } from "@mui/material";

const Financials: React.FC<FinancialsProps> = ({
  financialsCategories,
  financialsList,
  financialsAdd,
  financialsType,
  currentPage,
  setPage,
}) => {
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  const { t } = useTranslation("main-page");

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const resetForm = () => {
    setAmount("");
  };

  const handleCategoryChange = (
    event: React.SyntheticEvent,
    value: ICategory | null
  ) => {
    setSelectedCategory(value);

    if (!value) return resetForm();

    const lastEntry = (financialsList as (IIncome | IPayment)[]).find(
      (item: IIncome | IPayment) => item.name === value.name
    );

    if (!lastEntry) return resetForm();

    setAmount(lastEntry.amount.toString());
  };

  const handleAdd = () => {
    if (selectedCategory && amount) {
      financialsAdd(
        parseFloat(amount),
        selectedCategory.name,
        selectedCategory.id
      );
      resetForm();
    }
  };

  return (
    <FinancialsContainer>
      <ListContainer>
        <NameAutocomplete
          options={financialsCategories || []}
          getOptionLabel={(option: any) => option.name}
          value={selectedCategory}
          onChange={(event: React.SyntheticEvent, value: unknown) => {
            const selectedValue = value as ICategory | null;
            handleCategoryChange(event, selectedValue);
          }}
          renderInput={(params) => (
            <StyledTextField
              label={
                t(`${financialsType}.${financialsType}NameLabel`) as string
              }
              variant="outlined"
              margin="normal"
              {...params}
            />
          )}
        />

        <StyledTextField
          label={t(`${financialsType}.amountLabel`)}
          variant="outlined"
          fullWidth
          value={amount}
          onChange={handleAmountChange}
        />

        <AddButton variant="contained" color="primary" onClick={handleAdd}>
          {t(
            `${financialsType}.add${
              financialsType.charAt(0).toUpperCase() + financialsType.slice(1)
            }Button`
          )}
        </AddButton>
        <ListItemText
          primary={t(
            `${financialsType}.previous${
              financialsType.charAt(0).toUpperCase() + financialsType.slice(1)
            }Label`
          )}
        />
        <ListContainer>
          {financialsList.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.name} secondary={`$${item.amount}`} />
              {item.date}
            </ListItem>
          ))}
          <Pagination
            count={10}
            page={currentPage}
            onChange={handleChangePage}
          />
        </ListContainer>
      </ListContainer>
    </FinancialsContainer>
  );
};

export default Financials;
