import React from "react";

function CommentsLodingSkeleton() {
  return (
    <article className="p-4 space-y-3 rounded-lg border border-slate-200 py-6 **:animate-pulse">
      <div className="flex-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-400 rounded-full" />
          <div className="w-20 h-2 bg-gray-400 rounded-full" />
        </div>

        <div className="flex gap-5">
          <div className="w-10 h-2 bg-gray-400 rounded-full"></div>
        </div>
      </div>
      <div className="w-70 h-3 bg-gray-400 rounded-full" />
    </article>
  );
}

export default CommentsLodingSkeleton;
