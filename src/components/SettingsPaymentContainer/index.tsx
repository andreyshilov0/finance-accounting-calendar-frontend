import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  SettingsContainer,
  CategoryList,
  CategoryItem,
  CategoryName,
  CategoryActions,
  SectionHeader,
} from "../Settings/styles";
import { ICategory } from "@components/Settings/types";
import { useTranslation } from "react-i18next";
import EditCategoryDialog from "@components/ButtonEditCategory";
import DeleteCategoryDialog from "@components/ButtonDeleteCategory";
import AddButton from "@components/ButtonAddCategory";
import { usePaymentCategories } from "@components/Settings/hooks/usePaymentCategories";
import { usePaymentCategoryCreate } from "@components/Settings/hooks/usePaymentCategoryCreate";
import { usePaymentCategoryEdit } from "@components/Settings/hooks/usePaymentCategoryEdit";
import { usePaymentCategoryDelete } from "../Settings/hooks/usePaymentCategoryDelete";

const SettingsPaymentContainer: React.FC = () => {
  const { paymentCategories } = usePaymentCategories();
  const { addPaymentCategoryByName } = usePaymentCategoryCreate();
  const { editPaymentCategoryName } = usePaymentCategoryEdit();
  const { removePaymentCategory } = usePaymentCategoryDelete();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [selectedPaymentCategory, setSelectedPaymentCategory] =
    useState<ICategory | null>(null);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [categoryToDelete, setCategoryToDelete] = useState<ICategory | null>(
    null
  );

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const handleEditCategory = async (category: ICategory) => {
    setSelectedPaymentCategory(category);
    setIsPaymentModalOpen(true);
  };

  const handleDeleteCategory = (category: ICategory) => {
    setCategoryToDelete(category);
    setIsDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (categoryToDelete?.id !== undefined) {
      await removePaymentCategory(categoryToDelete.id);
    }
    setIsDeleteConfirmationOpen(false);
  };

  const handleAddPaymentCategory = (categoryName: string) => {
    addPaymentCategoryByName(categoryName);
  };

  const handleSaveEditCategoryPayment = async () => {
    if (selectedPaymentCategory && newCategoryName) {
      const categoryId = selectedPaymentCategory.id;

      const updatedCategory = await editPaymentCategoryName(
        categoryId,
        newCategoryName
      );
      if (updatedCategory) {
        setIsPaymentModalOpen(false);
      }
    }
  };

  const { t } = useTranslation("main-page");

  return (
    <SettingsContainer>
      <SectionHeader>
        <Typography variant="h6">
          {t("settings.paymentsCategoriesTitle")}
        </Typography>
        <AddButton
          onAdd={handleAddPaymentCategory}
          categoryType={paymentCategories || []}
        />
      </SectionHeader>
      <CategoryList>
        {paymentCategories?.map((category: ICategory) => (
          <CategoryItem key={category.id}>
            <CategoryName>{category.name}</CategoryName>
            <CategoryActions>
              <Edit onClick={() => handleEditCategory(category)} />
              <Delete onClick={() => handleDeleteCategory(category)} />
            </CategoryActions>
          </CategoryItem>
        ))}
      </CategoryList>

      <EditCategoryDialog
        isOpen={isPaymentModalOpen}
        onClose={() => {
          setIsPaymentModalOpen(false);
        }}
        onSave={handleSaveEditCategoryPayment}
        categoryName={newCategoryName}
        categoryType={paymentCategories || []}
        onCategoryNameChange={setNewCategoryName}
      />

      <DeleteCategoryDialog
        isOpen={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
        onDelete={handleConfirmDelete}
        categoryName={categoryToDelete?.name || ""}
      />
    </SettingsContainer>
  );
};

export default SettingsPaymentContainer;
