import useCategories from "../../../../hooks/useCategories";
import ModeratorCategoriesTable from "../../templates/moderator/categories/ModeratorCategoriesTable";
import ModeratorSubCategoriesTable from "../../templates/moderator/categories/ModeratorSubCategoriesTable";
import PageLable from "../../ui/PageLable";

function ModeratorCategories() {
  const { isLoading, categories, reFetchCategories, errorCategories } =
    useCategories();
  return (
    <div className="space-y-10">
      <PageLable lable="مدیریت دسته بندی ها" />
      <ModeratorCategoriesTable
        isLoading={isLoading}
        categories={categories}
        reFetchCategories={reFetchCategories}
        errorCategories={errorCategories}
      />
      <ModeratorSubCategoriesTable categories={categories} />
    </div>
  );
}

export default ModeratorCategories;
