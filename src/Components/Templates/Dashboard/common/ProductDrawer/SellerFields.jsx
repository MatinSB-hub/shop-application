import React from "react";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import AsyncSelect from "react-select/async";
import { searchSellers } from "../../../../../services/seller.services";
import { LuOption } from "react-icons/lu";

function SellerFields({ sellers, onAdd, onRemove, onChange }) {
  const loadSellersOptions = async (inputValue) => {
    const sellers = await searchSellers(inputValue);
    console.log(inputValue);
    return sellers.map((seller) => ({
      value: seller._id,
      label: seller.name,
    }));
  };
  return (
    <div className="flex flex-col gap-2 my-5">
      <div className="w-full h-max flex justify-between items-center">
        <span className="">فروشندگان:</span>
        <button
          className=" text-blue-500 flex justify-center items-center gap-2"
          onClick={onAdd}
        >
          <FaPlus size={12} /> افزودن
        </button>
      </div>
      <div className="space-y-3">
        {sellers.map((seller, index) => {
          return (
            <div
              className="flex justify-between items-center gap-2 "
              key={index}
            >
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={loadSellersOptions}
                value={seller.info}
                onChange={(option) => {
                  onChange(index, "info", option);
                  onChange(index, "id", option);
                }}
                loadingMessage={() => "درحالی جستوجو..."}
                noOptionsMessage={() => "فروشنده ای یافت نشد"}
                placeholder={"جستوجوی فروشنده"}
                className="w-30 shrink-0"
              />
              <input
                type="text"
                className="w-full h-10 border-2 primary-border rounded-lg"
                placeholder="قیمت"
                value={seller.price}
                onChange={(e) => onChange(index, "price", e.target.value)}
              />
              <input
                type="text"
                className="w-full h-10 border-2 primary-border rounded-lg"
                value={seller.stock}
                onChange={(e) => onChange(index, "stock", e.target.value)}
              />
              {sellers.length > 1 && (
                <button
                  className="shrink-0 text-red-500"
                  onClick={() => onRemove(index)}
                >
                  <IoClose size={20} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SellerFields;
