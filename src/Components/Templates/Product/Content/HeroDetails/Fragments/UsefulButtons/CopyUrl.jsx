import { FaShare } from "react-icons/fa6";
import Tooltip from "../../../../../../Ui/Tooltip";
import { useState } from "react";

const CopyUrl = () => {
  const [inCopied, setIsCopied] = useState(false);
  const copyUrl = () => {
    const currentUrl = location.href;
    navigator.clipboard.writeText(currentUrl);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };
  return (
    <Tooltip text={`${inCopied ? "آدرس با موفقیت کپی شد" : "اشتراک گذاری"}`}>
      <button
        className="cursor-pointer size-8 text-sm hover:*:text-lg *:duration-150 *:transition-all active:*:text-sm flex-center border border-neutral-300 rounded-lg text-slate-700"
        onClick={copyUrl}
      >
        <FaShare />
      </button>
    </Tooltip>
  );
};

export default CopyUrl;
