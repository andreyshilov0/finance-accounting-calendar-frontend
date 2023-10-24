import { ICategory } from "@components/Settings/types";

export interface PropsCategoryContainer {
  categories: ICategory[];
  addCategoryByName: (name: string) => void;
  editCategoryName: (id: number, name: string) => void;
  removeCategory: (id: number) => void;
  titleTranslationName: string;
}
