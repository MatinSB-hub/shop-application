import { useEffect, useReducer, useRef, useState } from "react";
import Modal from "../../../../../../Components/Templates/Dashboard/Modal/index";
import FilterReducer from "../../../../../../lib/reducers/categories/FilterReducer";
import useCategoriesForm from "../../../../../../hooks/useCategoriesForm";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import FiltersEditor from "./FiltersEditor";
import { BiImageAdd } from "react-icons/bi";
import { useAsync } from "react-select/async";
import { HiX } from "react-icons/hi";
import useSubCategoriesForm from "../../../../../../hooks/useSubCategoriesForm";
import useCategories from "../../../../../../hooks/useCategories";
import ParentCategoriesField from "./ParentCategoriesField";

const CreateSubCategoryModal = ({
  isOpen,
  editingMode,
  onClose,
  reFetchSubCategories,
}) => {
  const { categories, isLoading, errorCategories } = useCategories();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [parenCategory, setParenCategory] = useState("");
  const [filters, dispatchFilters] = useReducer(FilterReducer, []);

  const { error, isSubmitting, submit } = useSubCategoriesForm(() => {
    toast.success("ایجاد زیر دسته بندی با موفقیت انجام شد");
    handleClose();
    reFetchSubCategories();
  });

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setDescription("");
    dispatchFilters({ type: "filters/reset" });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    const result = await submit(
      title,
      slug,
      parenCategory,
      description,
      filters,
    );
  };

  useEffect(() => {
    if (editingMode) {
      setTitle(editingMode.title);
      setSlug(editingMode.slug);
      setDescription(editingMode.description);
      setTitle(editingMode.title);
    }
  }, [editingMode]);

  return (
    <Modal title="زیر دسته‌بندی جدید" isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-zinc-700 block mb-1">عنوان</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-10 text-sm rounded-md outline-none primary-border px-3"
          />
        </div>

        <div>
          <label className="text-sm text-zinc-700 block mb-1">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full h-10 text-sm rounded-md outline-none primary-border px-3"
          />
        </div>
        {!isLoading && !errorCategories ? (
          <ParentCategoriesField
            categories={categories}
            setParentCategory={setParenCategory}
          />
        ) : (
          <span className="text-gray-500 text-sm">
            در حال دریافت دسته بندی ها...
          </span>
        )}

        <div>
          <label className="text-sm text-zinc-700 block mb-1">توضیحات</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-24 text-sm rounded-md outline-none primary-border px-3 pt-2"
          />
        </div>

        <FiltersEditor filters={filters} dispatch={dispatchFilters} />

        {error && <p className="text-red-500 text-xs">error</p>}

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            className="px-4 py-2 rounded-md bg-zinc-100 text-zinc-600 text-sm"
            onClick={handleClose}
          >
            انصراف
          </button>
          <button
            className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm disabled:opacity-50"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "ثبت"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateSubCategoryModal;
