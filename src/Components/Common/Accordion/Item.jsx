import { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";

const AccordionItem = ({ label, content }) => {
  const [isOpen,setIsOpen] = useState(false)
  const toggleIsOpen = ()=>{
    setIsOpen(prev=>!prev)
  }
  return (
    <div onClick={toggleIsOpen}>
      <div
        className={`flex-between select-none h-12 text-sm px-4 flex-ic duration-300 ${isOpen && "bg-blue-200 text-blue-500"} active:*:scale-95 min-h-20 group cursor-pointer `}
        tabIndex="1"
      >
        <div className={`duration-300 cursor-pointer w-full ${isOpen && " text-blue-500"}`}>{label}</div>
        <BiChevronLeft />
      </div>
      <div className={`${isOpen ? "h-full py-3 px-6" : "h-0! opacity-0! invisible overflow-hidden p-0! whitespace-nowrap"} duration-300 transition-all text-sm text-slate-500`}>
        {isOpen ? content : null}
      </div>
    </div>
  );
};

export default AccordionItem;
