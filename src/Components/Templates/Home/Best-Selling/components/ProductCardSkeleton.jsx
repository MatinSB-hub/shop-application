import React from "react";

function ProductCardSkeleton() {
  return (
    <article className="w-full h-64 relative space-y-3 flex flex-col justify-between pl-2 **:animate-pulse">


      <header className="h-60 w-full bg-gray-200 rounded-lg">
      </header>
      <main className="h-full">
        <p className="w-8/12 h-5 bg-gray-200 rounded-lg"></p>
      </main>
      <footer className="mt-auto! flex items-end justify-end">
        <div className="w-full flex justify-end">
          <div className="w-5/12 h-3 bg-gray-200 rounded-lg"></div>
        </div>
      </footer>
    </article>
  );
}

export default ProductCardSkeleton;
