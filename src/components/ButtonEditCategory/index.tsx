import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { EditCategoryDialogProps } from "./types";
import { Category } from "@components/Settings/types";
import { useTranslation } from "react-i18next";
import { useIncomeCategories } from "@components/Settings/hooks/useIncomeCategories";
import { usePaymentCategories } from "@components/Settings/hooks/usePaymentCategories";

const EditCategoryDialog = ({
  isOpen,
  onClose,
  onSave,
  categoryName: initialCategoryName,
  onCategoryNameChange,
}: EditCategoryDialogProps) => {
  const [isNameUnique, setIsNameUnique] = useState(true);
  const [inputName, setInputName] = useState(initialCategoryName);
  const { incomeCategories } = useIncomeCategories();
  const { paymentCategories } = usePaymentCategories();
  const { t } = useTranslation("main-page");

  useEffect(() => {
    setInputName(initialCategoryName);
  }, [initialCategoryName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setInputName(newName);

    const isUnique =
      !incomeCategories.find(
        (category: Category) => category.name === newName
      ) &&
      !paymentCategories.find(
        (category: Category) => category.name === newName
      );

    setIsNameUnique(isUnique);
  };

  const handleSaveCategory = () => {
    if (isNameUnique) {
      onCategoryNameChange(inputName);
      onSave(inputName);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{t("editCategoryDialog.dialogTitle")}</DialogTitle>
      <DialogContent>
        <TextField
          label={t("addButton.categoryNameLabel")}
          variant="outlined"
          fullWidth
          value={inputName}
          onChange={handleInputChange}
          error={!isNameUnique}
          helperText={!isNameUnique ? t("addButton.helperText") : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t("editCategoryDialog.cancelButton")}
        </Button>
        <Button
          onClick={handleSaveCategory}
          color="primary"
          disabled={!isNameUnique}
        >
          {t("editCategoryDialog.saveButton")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCategoryDialog;
