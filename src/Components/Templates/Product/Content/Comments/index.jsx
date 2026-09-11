import useGetProductComments from "../../../../../hooks/useGetProductComments";
import { getProductComments } from "../../../../../services/comment.services";
import Comment from "../../../../Common/Cards/Comment";
import AiOverview from "./Fragments/AiOverview";
import CreateComment from "./Fragments/CreateComment";

const ProductComments = ({ productID }) => {
  console.log("id:",productID)
  const { comments, isLoading, error } = useGetProductComments({
    productId: productID,
    limit: 3,
  });
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
        <CreateComment productID={productID} />

        <div className="col-span-5 ">
          {/* All Comments */}
          <div id="comments-content" className="pt-0! space-y-5">
            {Array.from({ length: 3 }).map((comment, index) => (
              <Comment key={index} {...comment} />
            ))}
          </div>

          <div className="mt-5 flex items-center justify-end">
            <button className="px-3 py-1.5 bg-slate-800 text-xs flex-center gap-1 rounded-md text-white">
              بارگذاری بیشتر
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductComments;
