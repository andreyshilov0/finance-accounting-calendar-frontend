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
import { ICategory } from "@components/Settings/types";
import { useTranslation } from "react-i18next";

const EditCategoryDialog: React.FC<EditCategoryDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  categoryName: initialCategoryName,
  categoryTypes = [],
  onCategoryNameChange,
}) => {
  const [inputName, setInputName] = useState<string>(initialCategoryName);
  const [isCategoryNameUnique, setIsCategoryNameUnique] =
    useState<boolean>(true);
  const { t } = useTranslation("main-page");

  const isInputEmpty: boolean = inputName.trim() === "";

  useEffect(() => {
    setInputName(initialCategoryName);
  }, [initialCategoryName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;
    setInputName(newValue);
    onCategoryNameChange(newValue);

    const isUnique = !categoryTypes.some(
      (category: ICategory) =>
        category.name === newValue && category.name !== initialCategoryName
    );
    setIsCategoryNameUnique(isUnique);
  };

  const handleSaveCategory = (): void => {
    if (isCategoryNameUnique && !isInputEmpty) {
      onSave(inputName);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{t("editCategoryDialog.dialogTitle")}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={t("addButton.categoryNameLabel")}
          type="text"
          fullWidth
          value={inputName}
          onChange={handleInputChange}
          error={!isCategoryNameUnique || isInputEmpty}
          helperText={
            !isCategoryNameUnique
              ? t("addButton.helperText")
              : isInputEmpty
              ? t("editCategoryDialog.inputIsEmpty")
              : null
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t("editCategoryDialog.cancelButton")}
        </Button>
        <Button onClick={handleSaveCategory} color="primary">
          {t("editCategoryDialog.saveButton")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCategoryDialog;
