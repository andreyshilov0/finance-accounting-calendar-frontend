import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Add } from "@mui/icons-material";
import { AddButtonProps } from "./types";
import { ICategory } from "@components/Settings/types";

const AddButton: React.FC<AddButtonProps> = ({ onAdd, categoryType }) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isNameUnique, setIsNameUnique] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { t } = useTranslation("main-page");

  const handleOpenDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setNewCategoryName("");
  };

  const handleSaveCategory = () => {
    onAdd(newCategoryName);
    handleCloseDialog();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.value;
    setNewCategoryName(inputName);

    const isUnique = !categoryType.find(
      (category: ICategory) => category.name === inputName
    );

    setIsNameUnique(isUnique);
    setIsButtonDisabled(!isUnique);
  };

  return (
    <>
      <IconButton className="AddButton" onClick={handleOpenDialog}>
        {t("addButton.addButtonText")}
        <Add />
      </IconButton>

      <Dialog open={isAddDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{t("addButton.dialogTitle")}</DialogTitle>
        <DialogContent>
          <TextField
            label={t("addButton.categoryNameLabel")}
            variant="outlined"
            fullWidth
            value={newCategoryName}
            onChange={handleInputChange}
            error={!isNameUnique}
            helperText={!isNameUnique ? t("addButton.helperText") : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            {t("addButton.cancelButton")}
          </Button>
          <Button
            onClick={handleSaveCategory}
            color="primary"
            disabled={isButtonDisabled}
          >
            {t("addButton.saveButton")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddButton;
