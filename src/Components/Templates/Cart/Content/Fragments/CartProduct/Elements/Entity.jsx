import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Entity = ({ count, onCountChange, isUpdating }) => {
  const [pendingAction, setPendingAction] = useState(null);

  const handleOnCountChange = (action) => {
    setPendingAction(action);
    onCountChange(action === "plus" ? count + 1 : count - 1);
  };
  // Button ClassNames
  const buttonCSS =
    "size-8 rounded-md bg-white flex-center border border-neutral-200 text-slate-600 disabled:opacity-50 disabled:cursor-wait!";

  return (
    <div className="flex-center gap-5">
      <button
        className={buttonCSS}
        disabled={isUpdating}
        onClick={() => handleOnCountChange("minus")}
      >
        {isUpdating && pendingAction === "minus" ? (
          <AiOutlineLoading3Quarters className="animate-spin " />
        ) : (
          <FaMinus />
        )}
      </button>

      <p>{Number(count).toLocaleString("fa-IR")} عدد</p>

      <button
        className={buttonCSS}
        disabled={isUpdating}
        onClick={() => handleOnCountChange("plus")}
      >
        {isUpdating && pendingAction === "plus" ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          <FaPlus />
        )}
      </button>
    </div>
  );
};

export default Entity;
