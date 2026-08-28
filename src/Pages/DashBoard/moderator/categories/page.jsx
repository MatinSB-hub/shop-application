import ModeratorCategoriesTable from "../../templates/moderator/categories/ModeratorCategoriesTable";
import ModeratorSubCategoriesTable from "../../templates/moderator/categories/ModeratorSubCategoriesTable";
import PageLable from "../../ui/PageLable";

function ModeratorCategories() {
  return (
    <div className="space-y-10">
      <PageLable lable="مدیریت دسته بندی ها" />
      <ModeratorCategoriesTable />
      <ModeratorSubCategoriesTable />
    </div>
  );
}

export default ModeratorCategories;
