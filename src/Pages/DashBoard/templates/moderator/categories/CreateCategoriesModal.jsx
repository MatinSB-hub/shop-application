import { useReducer, useState } from "react";
import Modal from "../../../../../Components/Templates/Dashboard/Modal/index";
import FilterReducer from "../../../../../lib/reducers/categories/FilterReducer";
import useCategoriesForm from "../../../../../hooks/useCategoriesForm";
import { toast } from "sonner";

const CreateCategoryModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const [filters, dispatchFilters] = useReducer(FilterReducer, []);

  const { error, isSubmiting, submit } = useCategoriesForm(() => {
    toast.success("ایجاد دسسته بندی با موفقیت انجام شد");
    resetForm();
  });

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setDescription("");
    setIconFile(null);
    dispatchFilters({ type: "filters/reset" });
  };

  return (
    <Modal title="دسته‌بندی جدید" isOpen={isOpen} onClose={onClose}>
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

        <div>
          <label className="text-sm text-zinc-700 block mb-1">توضیحات</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-24 text-sm rounded-md outline-none primary-border px-3 pt-2"
          />
        </div>

        <div>
          <label className="text-sm text-zinc-700 block mb-1">
            آیکون (اختیاری)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setIconFile(e.target.files[0] || null)}
          />
        </div>

        <p className="text-red-500 text-xs">error</p>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button className="px-4 py-2 rounded-md bg-zinc-100 text-zinc-600 text-sm">
            انصراف
          </button>
          <button className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm disabled:opacity-50">
            ثبت
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateCategoryModal;
