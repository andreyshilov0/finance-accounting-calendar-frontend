import React, { useState } from "react";
import { ListItem, ListItemText } from "@mui/material";
import {
  FinancialsContainer,
  ListContainer,
  InputField,
  AddButton,
  NameAutocomplete,
} from "./styles";
import { useTranslation } from "react-i18next";
import { ICategory } from "@components/Settings/types";
import { FinancialsProps } from "./types";

const Financials: React.FC<FinancialsProps> = ({
  categories,
  list,
  add,
  type,
}) => {
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  const { t } = useTranslation("main-page");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const resetForm = () => {
    setAmount("");
    setSelectedCategory(null);
  };

  const handleCategoryChange = (
    event: React.SyntheticEvent,
    value: ICategory | null
  ) => {
    setSelectedCategory(value);

    if (!value) return resetForm();

    const lastEntry = list.find((item) => item.name === value.name);
    if (!lastEntry) return resetForm();

    setAmount(lastEntry.amount.toString());
  };

  const handleAdd = () => {
    if (selectedCategory && amount) {
      add(parseFloat(amount), selectedCategory.name, selectedCategory.id);
      resetForm();
    }
  };

  const sortedList = [...list].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return (
    <FinancialsContainer>
      <ListContainer>
        <NameAutocomplete
          options={categories || []}
          getOptionLabel={(option: any) => option.name}
          value={selectedCategory}
          onChange={(event: React.SyntheticEvent, value: unknown) => {
            const selectedValue = value as ICategory | null;
            handleCategoryChange(event, selectedValue);
          }}
          renderInput={(params) => (
            <InputField
              label={t(`${type}.${type}NameLabel`)}
              variant="outlined"
              {...params}
            />
          )}
        />
        <InputField
          label={t(`${type}.amountLabel`)}
          variant="outlined"
          fullWidth
          value={amount}
          onChange={handleAmountChange}
        />

        <AddButton variant="contained" color="primary" onClick={handleAdd}>
          {t(
            `${type}.add${type.charAt(0).toUpperCase() + type.slice(1)}Button`
          )}
        </AddButton>
        <ListItemText
          primary={t(
            `${type}.previous${
              type.charAt(0).toUpperCase() + type.slice(1)
            }Label`
          )}
        />
        <ListContainer>
          {sortedList.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.name} secondary={`$${item.amount}`} />
              {item.date}
            </ListItem>
          ))}
        </ListContainer>
      </ListContainer>
    </FinancialsContainer>
  );
};

export default Financials;
