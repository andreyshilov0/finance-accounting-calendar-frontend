export interface EditCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  categoryName: string;
  onCategoryNameChange: (name: string) => void;
}
