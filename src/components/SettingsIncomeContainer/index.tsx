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
import { Category } from "@components/Settings/types";
import { useTranslation } from "react-i18next";
import EditCategoryDialog from "@components/ButtonEditCategory";
import DeleteCategoryDialog from "@components/ButtonDeleteCategory";
import AddButton from "@components/ButtonAddCategory";
import { useIncomeCategories } from "@components/Settings/hooks/useIncomeCategories";
import { useIncomeCategoryCreate } from "@components/Settings/hooks/useIncomeCategoryCreate";
import { useIncomeCategoryEdit } from "@components/Settings/hooks/useIncomeCategoryEdit";
import { useIncomeCategoryDelete } from "@components/Settings/hooks/useIncomeCategoryDelete";

const SettingsIncomeContainer: React.FC = () => {
  const { incomeCategories } = useIncomeCategories();
  const { addIncomeCategoryByName } = useIncomeCategoryCreate();
  const { editIncomeCategoryName } = useIncomeCategoryEdit();
  const { removeIncomeCategory } = useIncomeCategoryDelete();
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState<boolean>(false);
  const [selectedIncomeCategory, setSelectedIncomeCategory] =
    useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const handleEditCategory = async (category: Category) => {
    setSelectedIncomeCategory(category);
    setIsIncomeModalOpen(true);
  };

  const handleDeleteCategory = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (categoryToDelete?.id !== undefined) {
      await removeIncomeCategory(categoryToDelete.id);
    }
    setIsDeleteConfirmationOpen(false);
  };

  const handleAddIncomeCategory = (categoryName: string) => {
    addIncomeCategoryByName(categoryName);
  };

  const handleSaveEditCategoryIncome = async () => {
    if (selectedIncomeCategory && newCategoryName) {
      const categoryId = selectedIncomeCategory.id;

      const updatedCategory = await editIncomeCategoryName(
        categoryId,
        newCategoryName
      );
      if (updatedCategory) {
        setIsIncomeModalOpen(false);
      } else {
        // Обработка ошибки редактирования категории ** Добавить!!!
      }
    }
  };

  const { t } = useTranslation("main-page");

  return (
    <SettingsContainer>
      <SectionHeader>
        <Typography variant="h6">
          {t("settings.incomingCategoriesTitle")}
        </Typography>
        <AddButton onAdd={handleAddIncomeCategory} />
      </SectionHeader>
      <CategoryList>
        {incomeCategories?.map((category: Category) => (
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
        isOpen={isIncomeModalOpen}
        onClose={() => {
          setIsIncomeModalOpen(false);
        }}
        onSave={handleSaveEditCategoryIncome}
        categoryName={newCategoryName}
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

export default SettingsIncomeContainer;
