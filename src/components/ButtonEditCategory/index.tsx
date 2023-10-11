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

const EditCategoryDialog = ({
  isOpen,
  onClose,
  onSave,
  categoryName: initialCategoryName,
  categoryType,
  onCategoryNameChange,
}: EditCategoryDialogProps) => {
  const [inputName, setInputName] = useState(initialCategoryName);
  const [isCategoryNameUnique, setIsCategoryNameUnique] = useState(true);
  const { t } = useTranslation("main-page");
  const isInputEmpty = inputName.trim() === "";

  useEffect(() => {
    setIsCategoryNameUnique(
      !categoryType?.find(
        (category: Category) =>
          category.name === inputName && category.name !== initialCategoryName
      )
    );
  }, [inputName, categoryType, initialCategoryName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };

  const handleSaveCategory = () => {
    if (isCategoryNameUnique && !isInputEmpty) {
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
          error={!isCategoryNameUnique && !isInputEmpty}
          helperText={
            !isCategoryNameUnique && !isInputEmpty
              ? t("addButton.helperText")
              : ""
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t("editCategoryDialog.cancelButton")}
        </Button>
        <Button
          onClick={handleSaveCategory}
          color="primary"
          disabled={!isCategoryNameUnique || isInputEmpty}
        >
          {t("editCategoryDialog.saveButton")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCategoryDialog;
