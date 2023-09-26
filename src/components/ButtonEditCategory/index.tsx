import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { EditCategoryDialogProps } from "./types";
import { useTranslation } from "react-i18next";

const EditCategoryDialog = ({
  isOpen,
  onClose,
  onSave,
  categoryName,
  onCategoryNameChange,
}: EditCategoryDialogProps) => {
  const { t } = useTranslation("main-page");
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{t('editCategoryDialog.dialogTitle')}</DialogTitle>
      <DialogContent>
        <TextField
          label={t('addButton.categoryNameLabel')}
          variant="outlined"
          fullWidth
          value={categoryName}
          onChange={(e) => onCategoryNameChange(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t('editCategoryDialog.cancelButton')}
        </Button>
        <Button onClick={onSave} color="primary">
          {t('editCategoryDialog.saveButton')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCategoryDialog;
