import { useState } from "react";
import { FaStar } from "react-icons/fa";

function StarRate({ value, onChange }) {
  return (
    <div className="flex justify-end gap-0.5">
      {[5, 4, 3, 2, 1].map((rate) => (
        <FaStar
          key={rate}
          size={20}
          className={`text-slate-400 hover:text-amber-300 peer-hover:text-amber-300 peer ${rate <= value && "text-amber-300!"}`}
          onClick={() => onChange(rate)}
        />
      ))}
    </div>
  );
}

export default StarRate;
