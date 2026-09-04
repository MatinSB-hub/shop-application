import { useEffect, useReducer, useRef, useState } from "react";
import Modal from "../../../../../Components/Templates/Dashboard/Modal/index";
import FilterReducer from "../../../../../lib/reducers/categories/FilterReducer";
import useCategoriesForm from "../../../../../hooks/useCategoriesForm";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import FiltersEditor from "./FiltersEditor";
import { BiImageAdd } from "react-icons/bi";
import { useAsync } from "react-select/async";

const CreateCategoryModal = ({ isOpen, onClose, reFetchCategories }) => {
  const inputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [filters, dispatchFilters] = useReducer(FilterReducer, []);

  useEffect(() => {
    if (iconFile) {
      const newURL = URL.createObjectURL(iconFile);
      setUrl(newURL);

      return () => {
        (URL.revokeObjectURL(newURL), setUrl(null));
      };
    }
  }, [iconFile]);

  const { error, isSubmitting, submit } = useCategoriesForm(() => {
    toast.success("ایجاد دسسته بندی با موفقیت انجام شد");
    handleClose();
    reFetchCategories();
  });

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setDescription("");
    setIconFile(null);
    dispatchFilters({ type: "filters/reset" });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    const result = await submit(title, slug, description, iconFile, filters);
  };

  return (
    <Modal title="دسته‌بندی جدید" isOpen={isOpen} onClose={handleClose}>
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

        <div className="">
          <label className="text-sm text-zinc-700 block mb-1">
            آیکون (اختیاری)
          </label>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setIconFile(e.target.files[0] || null)}
              className="invisible hidden"
            />

            {!url && (
              <button
                onClick={() => inputRef.current?.click()}
                type="button"
                className="w-20 h-20 aspect-square rounded-md primary-border border-dashed flex flex-col items-center justify-center gap-1 text-zinc-500 hover:bg-zinc-50 hover:text-blue-500 transition-colors p-3"
              >
                <BiImageAdd className="text-xl" />
                <span className="text-[11px]">افزودن آیکن</span>
              </button>
            )}
            {url && (
              <img src={url} className="w-25 h-25 rounded-sm object-cover" />
            )}
          </div>
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

export default CreateCategoryModal;
