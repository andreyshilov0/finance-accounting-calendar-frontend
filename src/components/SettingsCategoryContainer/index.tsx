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
import { PropsCategoryContainer } from "./types";

const SettingsCategoryContainer: React.FC<PropsCategoryContainer> = ({
  categories,
  addCategoryByName,
  editCategoryName,
  removeCategory,
  titleTranslationName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [categoryToDelete, setCategoryToDelete] = useState<ICategory | null>(
    null
  );
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const handleEditCategory = (category: ICategory) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (category: ICategory) => {
    setCategoryToDelete(category);
    setIsDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (categoryToDelete?.id) {
      await removeCategory(categoryToDelete.id);
    }
    setIsDeleteConfirmationOpen(false);
  };

  const handleAddCategory = (categoryName: string) => {
    addCategoryByName(categoryName);
  };

  const handleSaveEditCategory = async () => {
    if (selectedCategory && newCategoryName) {
      await editCategoryName(selectedCategory.id, newCategoryName);
      setIsModalOpen(false);
    }
  };

  const { t } = useTranslation("main-page");

  return (
    <SettingsContainer>
      <SectionHeader>
        <Typography variant="h6">{t(titleTranslationName)}</Typography>
        <AddButton onAdd={handleAddCategory} categoryTypes={categories || []} />
      </SectionHeader>
      <CategoryList>
        {categories?.map((category: ICategory) => (
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEditCategory}
        categoryName={newCategoryName}
        categoryTypes={categories || []}
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

export default SettingsCategoryContainer;
