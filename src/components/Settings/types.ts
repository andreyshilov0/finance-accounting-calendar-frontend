export interface ICategory {
  id: number;
  name: string;
}

interface IUseCategoriesResponse {
  loading: boolean;
  error?: Error;
}

export interface IUseCategoryQuery extends IUseCategoriesResponse {
  incomeCategories: ICategory[];
  paymentCategories: ICategory[];
}

export interface IUseCategoryMutationCreate extends IUseCategoriesResponse {
  addIncomeCategoryByName: string;
  addPaymentCategoryByName: string;
}

export interface IUseCategoryMutationDelete extends IUseCategoriesResponse {
  removeIncomeCategory: boolean;
  removePaymentCategory: boolean;
}

export interface IUseCategoryMutationEdit extends IUseCategoriesResponse {
  updatePaymentCategoryName: {
    category: ICategory | null;
  };
  updateIncomeCategoryName: {
    category: ICategory | null;
  };
}

