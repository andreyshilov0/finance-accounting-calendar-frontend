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

const AddButton: React.FC<AddButtonProps> = ({ onAdd }) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
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
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            {t("addButton.cancelButton")}
          </Button>
          <Button onClick={handleSaveCategory} color="primary">
            {t("addButton.saveButton")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddButton;
