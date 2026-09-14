import React from "react";

function ProductLoadinSkeleton() {
  return (
    <div className="w-full h-screen flex justify-center items-start gap-10 mt-10 **:animate-custom-pulse ">
      <div className="w-[70%] h-135 border-2 primary-border  rounded-2xl">
        <div className="w-full h-full flex justify-around pt-5">
          <div className="w-[55%] h-[90%] bg-gray-300 rounded-2xl" />
          <div className="w-[35%] h-full">
            <div className="w-[90%] h-[40%] bg-gray-300 rounded-2xl mb-12" />
            <div className="w-[90%] h-[40%] flex flex-col gap-5">
              <div className="w-full h-5 bg-gray-300 rounded-sm" />
              <div className="w-full h-5 bg-gray-300 rounded-sm" />
              <div className="w-full h-5 bg-gray-300 rounded-sm" />
              <div className="w-[50%] h-5 bg-gray-300 rounded-sm" />
              <div className="w-[50%] h-5 bg-gray-300 rounded-sm" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[20%] h-112.5 flex justify-center items-center border-2 primary-border rounded-2xl">
        <div className="w-full h-full flex flex-col justify-center items-center ">
          <div className="w-[90%] h-[40%] bg-gray-300 rounded-2xl mb-12" />
          <div className="w-[90%] h-[40%] flex items-end gap-5">
            <div className="w-full h-13 bg-gray-300 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductLoadinSkeleton;
