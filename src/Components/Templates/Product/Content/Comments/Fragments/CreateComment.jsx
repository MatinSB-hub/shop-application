import { useState } from "react";
import StarRate from "./StarRate";

const CreateComment = () => {
  const [commentText, setCommentText] = useState("");
  return (
    <div className="col-span-3 space-y-3 bg-slate-50 rounded-lg border border-slate-200 max-h-max sticky top-4">
      <div>
        <label className="text-xs select-none cursor-pointer text-slate-500">
          امتیاز دهی
        </label>
        <StarRate/>
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
          className="w-full rounded-md border border-slate-200 bg-white mt-1.5 h-[130px]"
        ></textarea>
      </div>

      <button className="w-full text-xs h-10 bg-slate-800 text-white focus-within:ring-4! ring-slate-600/50">
        ثبت نظر
      </button>
    </div>
  );
};

export default CreateComment;
