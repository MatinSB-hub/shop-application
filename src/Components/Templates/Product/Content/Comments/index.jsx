import { useEffect, useState } from "react";
import useGetProductComments from "../../../../../hooks/useGetProductComments";
import { getProductComments } from "../../../../../services/comment.services";
import Comment from "../../../../Common/Cards/Comment";
import AiOverview from "./Fragments/AiOverview";
import CommentsLodingSkeleton from "./Fragments/CommentsLodingSkeleton";
import CreateComment from "./Fragments/CreateComment";

const ProductComments = ({ productID }) => {
  console.log("id:", productID);
  const [limit, setLimit] = useState(3);
  const { comments, reFetchComments, isLoading, error } = useGetProductComments(
    {
      productId: productID,
      limit: 3,
      cursor: "",
    },
  );

  const handleReFetchComments = () => {
    reFetchComments({
      productId: productID,
      limit,
      cursor: "",
    });
  };

  useEffect(() => {
    handleReFetchComments();
  }, [limit]);

  console.log("comments:", comments);
  return (
    <section id="product-comments" className="space-y-8">
      <h4 className="text-lg text-slate-700 font-black">نظرات کاربران</h4>
      <AiOverview />

      <div
        id="comments-container"
        className="grid grid-cols-8 *:w-full gap-5 *:p-4"
      >
        {/* New Comment */}
        <CreateComment
          productID={productID}
          reFetchComments={handleReFetchComments}
        />

        <div className="col-span-5 ">
          {/* All Comments */}
          <div id="comments-content" className="pt-0! space-y-5">
            {isLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <CommentsLodingSkeleton key={index} />
              ))}
            {!isLoading &&
              !error &&
              comments?.comments?.map((comment, index) => (
                <Comment key={index} {...comment} />
              ))}
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <div className="mt-5 flex items-center justify-end">
            {comments?.pagination?.hasNextPage && (
              <button
                className="px-3 py-1.5 bg-slate-800 text-xs flex-center gap-1 rounded-md text-white"
                onClick={() => setLimit((prev) => prev * 2)}
              >
                بارگذاری بیشتر
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductComments;
