import React from "react";

function CascadeCategories({ categories }) {

  return (
    <div className="w-full h-max flex flex-col justify-center items-center gap-5 text-sm rounded-md outline-none mt-2">
      {categories.map((option, index) => {
        return (
          <select
            key={index}
            value={"default"}
            className="w-full h-10  bg-white text-sm rounded-md outline-none primary-border px-3"
          >
            <option value="default" disabled>
              {option.title}
            </option>
            {option.subCategories.map((subCategory, index) => {
             return <option key={subCategory._id}>{subCategory.title}</option>;
            })}
          </select>
        );
      })}
    </div>
  );
}

export default CascadeCategories;
