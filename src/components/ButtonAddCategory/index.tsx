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
import { Add } from "@mui/icons-material";
import { AddButtonProps } from "./types";

const AddButton: React.FC<AddButtonProps> = ({ onAdd }) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

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
        Add new
        <Add />
      </IconButton>

      <Dialog open={isAddDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveCategory} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddButton;
