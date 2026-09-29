import React from "react";
import { BiPlus } from "react-icons/bi";
import { HiX } from "react-icons/hi";

const FILTER_TYPES = [
  { value: "radio", label: "رادیویی" },
  { value: "selectbox", label: "select (انتخابی)" },
];

function FiltersEditor({ filters, dispatch }) {
  console.log(filters);
  const contertTextToArray = (e, index) => {
    const array = e.target.value
      .split(",")
      .map((option) => option.trim())
      .filter(Boolean);
    dispatch({
      type: "filters/optionsChange",
      payload: { index, options: array },
    });
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-zinc-700">
          فیلترهای دسته‌بندی
        </label>
        <button
          onClick={() => dispatch({ type: "filters/add" })}
          type="button"
          className="text-blue-500 text-xs flex items-center gap-1"
        >
          <BiPlus /> افزودن فیلتر
        </button>
      </div>

      <div className="space-y-3 ">
        {filters.map((filter, index) => (
          <div
            key={filter.index}
            className="border border-zinc-200 rounded-md p-3 space-y-2"
          >
            <div className="flex items-center gap-2">
              <input
                onChange={(e) =>
                  dispatch({
                    type: "filters/fieldChange",
                    payload: {
                      index,
                      field: "name",
                      value: e.target.value,
                    },
                  })
                }
                value={filter.name}
                placeholder="نام فیلتر (مثلا رم)"
                className="flex-1 h-9 text-sm rounded-md outline-none primary-border px-2"
              />
              <button
                onClick={() =>
                  dispatch({ type: "filters/remove", payload: { index } })
                }
                type="button"
                className="text-red-500 shrink-0"
              >
                <HiX />
              </button>
            </div>

            <input
              onChange={(e) =>
                dispatch({
                  type: "filters/fieldChange",
                  payload: {
                    index,
                    field: "slug",
                    value: e.target.value,
                  },
                })
              }
              value={filter.slug}
              placeholder="slug (مثلا ram)"
              className="w-full h-9 text-sm rounded-md outline-none primary-border px-2"
            />

            <input
              onChange={(e) =>
                dispatch({
                  type: "filters/fieldChange",
                  payload: {
                    index,
                    field: "description",
                    value: e.target.value,
                  },
                })
              }
              value={filter.description}
              placeholder="توضیح فیلتر"
              className="w-full h-9 text-sm rounded-md outline-none primary-border px-2"
            />

            <select
              onChange={(e) =>
                dispatch({
                  type: "filters/fieldChange",
                  payload: {
                    index,
                    field: "type",
                    value: e.target.value,
                  },
                })
              }
              value={filter.type}
              className="w-full h-9 text-sm rounded-md outline-none primary-border px-2 bg-white"
            >
              <option value="">انتخاب نوع فیلتر</option>
              {FILTER_TYPES.map((type) => (
                <option key={index} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            <input
              onBlur={(e) => contertTextToArray(e, index)}
              placeholder="گزینه‌ها با کاما جدا کن (مثلا: نو, کهنه, تعمیری)"
              className="w-full h-9 text-sm rounded-md outline-none primary-border px-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FiltersEditor;
