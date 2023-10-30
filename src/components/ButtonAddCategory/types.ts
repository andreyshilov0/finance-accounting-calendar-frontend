import { ICategory } from "@components/Settings/types";

export interface AddButtonProps {
  onAdd: (newCategoryName: string) => void;
  categoryTypes: ICategory[]
}