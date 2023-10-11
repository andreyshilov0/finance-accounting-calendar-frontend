import { ICategory } from "@components/Settings/types";

export interface EditCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newCategoryName: string) => void;
  categoryName: string;
  onCategoryNameChange: (name: string) => void;
  categoryType: ICategory[]; 
}
