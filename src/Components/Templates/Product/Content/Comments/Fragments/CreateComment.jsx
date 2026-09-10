import { useContext, useEffect, useRef, useState } from "react";
import StarRate from "./StarRate";
import useComment from "../../../../../../hooks/useComment";
import { toast } from "sonner";
import { authContext } from "../../../../../../Contexts/authProvider";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

const CreateComment = ({ productID }) => {
  const commentRef = useRef();
  const loc = useLocation();
  console.log("loc comment:", loc);

  const Navigate = useNavigate();

  const [commentText, setCommentText] = useState("");
  const [selectedRate, setSelectedRate] = useState(0);
  const { user } = useContext(authContext);

  const { submit, isLoading, error } = useComment(() => {
    setCommentText("");
    setSelectedRate(null);
    toast.success("کامنت با موفقیت ثبت شد");
  });

  useEffect(() => {
    if (loc.state.scrollTo === "comment") {
      commentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [loc.state]);

  const handleSubmitComment = () => {
    if (user) {
      submit(productID, commentText.trim(), selectedRate);
    } else {
      toast.info("برای ثبت کامنت وارد حساب کاربری خود شوید", {
        action: {
          label: "ورود به حساب",
          onClick: () => Navigate(`/auth?redirect=${loc.pathname}`),
        },
      });
    }
  };
  return (
    <div
      ref={commentRef}
      className="col-span-3 space-y-3 bg-slate-50 rounded-lg border border-slate-200 max-h-max sticky top-4"
    >
      <div>
        <label className="text-xs select-none cursor-pointer text-slate-500">
          امتیاز دهی
        </label>
        <StarRate value={selectedRate} onChange={setSelectedRate} />
      </div>

      <div>
        <label
          htmlFor="comment-content"
          className="text-xs select-none cursor-pointer text-slate-500"
        >
          متن کامنت
        </label>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          name="comment-content"
          id="comment-content"
          className="w-full rounded-md border border-slate-200 bg-white mt-1.5 h-32.5"
        ></textarea>
      </div>
      {!isLoading && error && <p className="text-sm text-red-500">{error}</p>}

      <button
        className="w-full text-xs h-10 bg-slate-800 text-white focus-within:ring-4! ring-slate-600/501 disabled:bg-slate-500"
        onClick={handleSubmitComment}
        disabled={isLoading}
      >
        {isLoading ? "درحال ثبت..." : "ثبت نظر"}
      </button>
    </div>
  );
};

export default CreateComment;
