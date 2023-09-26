import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import { DeleteCategoryDialogProps } from "./types";
import { useTranslation } from "react-i18next";
const DeleteCategoryDialog = ({
  isOpen,
  onClose,
  onDelete,
  categoryName,
}: DeleteCategoryDialogProps) => {
  const { t } = useTranslation("main-page");
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{t("deleteCategoryDialog.dialogTitle")}</DialogTitle>
      <DialogContent>
        <Typography>
          {t("deleteCategoryDialog.questionTitle")} "{categoryName}"?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t("deleteCategoryDialog.cancelButton")}
        </Button>
        <Button onClick={onDelete} color="primary">
          {t("deleteCategoryDialog.deleteButton")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCategoryDialog;
