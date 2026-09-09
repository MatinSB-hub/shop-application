import { useState } from "react";
import { FaStar } from "react-icons/fa";

function StarRate() {
  const [selectedRate, setSelectedRate] = useState();
  return (
    <div className="flex justify-end gap-0.5">
      {[5, 4, 3, 2, 1].map((rate) => (
        <FaStar
          size={20}
          className={`text-slate-400 hover:text-amber-300 peer-hover:text-amber-300 peer ${rate <= selectedRate && "text-amber-300!"}`}
          onClick={() => setSelectedRate(rate)}
        />
      ))}
    </div>
  );
}

export default StarRate;
