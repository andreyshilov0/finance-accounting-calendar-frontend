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
} from "./styles";
import { Category } from "./types";
import { useTranslation } from "react-i18next";
import EditCategoryDialog from "@components/ButtonEditCategory";
import DeleteCategoryDialog from "@components/ButtonDeleteCategory";
import AddButton from "@components/ButtonAddCategory";

const Settings: React.FC = () => {
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isPaymentsModalOpen, setIsPaymentsModalOpen] = useState(false);
  const [selectedIncomeCategory, setSelectedIncomeCategory] =
    useState<Category | null>(null);
  const [selectedPaymentsCategory, setSelectedPaymentsCategory] =
    useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false);

  const incomeCategories: Category[] = [{ id: "1", name: "Salary" }]; // Это и ниже тоже сделал для примера и проверки
  const paymentsCategories: Category[] = [{ id: "1", name: "Rent" }];

  const handleEditCategory = (category: Category) => {
    setSelectedIncomeCategory(category);
    setSelectedPaymentsCategory(category);
    setIsIncomeModalOpen(true);
    setIsPaymentsModalOpen(true);
  };

  const handleDeleteCategory = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleAddCategory = () => {
    setIsAddCategoryDialogOpen(true);
  };

  const handleSaveCategory = () => {
    setIsAddCategoryDialogOpen(false);
  };
  const { t } = useTranslation("main-page");

  return (
    <SettingsContainer>
      <SectionHeader>
        <Typography variant="h6">
          {t("settings.incomingCategoriesTitle")}
        </Typography>
        <AddButton onAdd={handleAddCategory} />
      </SectionHeader>
      <CategoryList>
        {incomeCategories.map((category) => (
          <CategoryItem key={category.id}>
            <CategoryName>{category.name}</CategoryName>
            <CategoryActions>
              <Edit onClick={() => handleEditCategory(category)} />
              <Delete onClick={() => handleDeleteCategory(category)} />
            </CategoryActions>
          </CategoryItem>
        ))}
      </CategoryList>
      <SectionHeader>
        <Typography variant="h6">
          {t("settings.paymentsCategoriesTitle")}
        </Typography>
        <AddButton onAdd={handleAddCategory} />
      </SectionHeader>
      <CategoryList>
        {paymentsCategories.map((category) => (
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
        isOpen={isIncomeModalOpen || isPaymentsModalOpen}
        onClose={() => {
          setIsIncomeModalOpen(false);
          setIsPaymentsModalOpen(false);
        }}
        onSave={handleSaveCategory}
        categoryName={newCategoryName}
        onCategoryNameChange={setNewCategoryName}
      />

      <DeleteCategoryDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleConfirmDelete}
        categoryName={categoryToDelete?.name || ""}
      />
    </SettingsContainer>
  );
};

export default Settings;
