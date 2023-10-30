import React from "react";
import { SettingsContainer } from "./styles";
import SettingsCategoryContainer from "@components/SettingsCategoryContainer";
import {
  useIncomeCategories,
  useIncomeCategoryCreate,
  useIncomeCategoryEdit,
  useIncomeCategoryDelete,
  usePaymentCategories,
  usePaymentCategoryCreate,
  usePaymentCategoryEdit,
  usePaymentCategoryDelete,
} from "@components/Settings/hooks";

const Settings: React.FC = () => {
  const { incomeCategories } = useIncomeCategories();
  const { addIncomeCategoryByName } = useIncomeCategoryCreate();
  const { editIncomeCategoryName } = useIncomeCategoryEdit();
  const { removeIncomeCategory } = useIncomeCategoryDelete();

  const { paymentCategories } = usePaymentCategories();
  const { addPaymentCategoryByName } = usePaymentCategoryCreate();
  const { editPaymentCategoryName } = usePaymentCategoryEdit();
  const { removePaymentCategory } = usePaymentCategoryDelete();

  return (
    <SettingsContainer>
      <SettingsCategoryContainer
        categories={incomeCategories ?? []}
        addCategoryByName={addIncomeCategoryByName}
        editCategoryName={editIncomeCategoryName}
        removeCategory={removeIncomeCategory}
        titleTranslationName="settings.incomingCategoriesTitle"
      />

      <SettingsCategoryContainer
        categories={paymentCategories ?? []}
        addCategoryByName={addPaymentCategoryByName}
        editCategoryName={editPaymentCategoryName}
        removeCategory={removePaymentCategory}
        titleTranslationName="settings.paymentsCategoriesTitle"
      />
    </SettingsContainer>
  );
};

export default Settings;
