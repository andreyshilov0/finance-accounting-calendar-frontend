export interface Category {
  id: string;
  name: string;
}

export interface SettingsProps {
  incomeCategories: Category[];
  paymentCategories: Category[];
}
