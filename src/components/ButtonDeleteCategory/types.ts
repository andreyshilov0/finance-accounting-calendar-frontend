export interface DeleteCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  categoryName: string;
}
