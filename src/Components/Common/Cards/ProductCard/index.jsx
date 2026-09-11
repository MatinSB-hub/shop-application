import { Link } from "react-router";

const ProductCard = ({ name, _id, sellers, images }) => {
  const price = sellers && sellers[0].price;
  return (
    <article className="w-full h-64 relative space-y-3 flex pl-2 justify-between flex-col">
      <Link className="absolute size-full" to={`/product/${_id}`} />

      <header className="h-34.5 flex-center w-full">
        <img
          src={
            images
              ? `https://shopino.iran.liara.run/images/products/${images && images[0]}`
              : "/assets/static/product1.png"
          }
          className="h-full object-cover"
        />
      </header>
      <main className="h-full">
        <p className="font-bold  line-clamp-2 text-slate-700 text-sm">{name}</p>
      </main>
      <footer className="mt-auto! flex items-end justify-end">
        <div className="flex-ic gap-1">
          <p className="font-black">{Number(price).toLocaleString("fa-IR")}</p>
          <div className="text-slate-600 text-xs">تومان</div>
        </div>
      </footer>
    </article>
  );
};

export default ProductCard;
