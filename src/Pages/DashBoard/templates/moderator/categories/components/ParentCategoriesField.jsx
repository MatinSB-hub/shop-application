function ParentCategoriesField({ categories, setParentCategory }) {
  return (
    <select
      className="w-full h-10 text-sm rounded-md outline-none primary-border px-3 bg-white"
      onChange={(e) => setParentCategory(e.target.value)}
    >
      <option value="" disabled>
        انتخاب دسته بندی
      </option>
      {categories?.map((category) => (
        <option key={category._id} value={category._id}>
          {category.title}
        </option>
      ))}
    </select>
  );
}

export default ParentCategoriesField;
