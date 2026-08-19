import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

function DynamicKeyValueFields({
  lable,
  items,
  onAdd,
  onRemove,
  onChange,
  keyPlaceHolder = "مثلا (رم)",
  valuePlaceHolder = "مثلا (8 گیگابایت)",
}) {
  return (
    <div className="flex flex-col gap-2 my-5">
      <div className="w-full h-max flex justify-between items-center">
        <span className="">{lable}:</span>
        <button
          className=" text-blue-500 flex justify-center items-center gap-2"
          onClick={onAdd}
        >
          {" "}
          <FaPlus size={12} /> افزودن
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => {
          return (
            <div className="flex justify-between items-center gap-2 " key={index}>
              <input
                type="text"
                className="w-full h-10 border-2 primary-border rounded-lg "
                placeholder={keyPlaceHolder}
                value={item.key}
                onChange={(e) => onChange(index, "key", e.target.value)}
              />
              <input
                type="text"
                className="w-full h-10 border-2 primary-border rounded-lg "
                placeholder={valuePlaceHolder}
                value={item.value}
                onChange={(e) => onChange(index, "value", e.target.value)}
              />
              {items.length > 1 && (
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

export default DynamicKeyValueFields;
