export interface Category {
  id: number;
  name: string;
}

export interface SettingsProps {
  incomeCategories: Category[];
  paymentCategories: Category[];
}

export const isCategoryNameUnique = (
  name: string,
  categories: Category[]
): boolean => {
  return !categories.some((category) => category.name === name);
};
