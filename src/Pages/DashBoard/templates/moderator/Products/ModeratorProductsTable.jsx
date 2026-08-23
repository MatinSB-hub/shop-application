import React, { useState } from "react";
import Table from "../../../../../Components/Templates/Dashboard/common/Table";
import TableToolbar from "../../../../../Components/Templates/Dashboard/common/Table/TableToolbar";
import TableRow from "../../../../../Components/Templates/Dashboard/common/Table/TableRow";
import TableBody from "../../../../../Components/Templates/Dashboard/common/Table/TableBody";
import TableHead from "../../../../../Components/Templates/Dashboard/common/Table/TableHead";
import TableCell from "../../../../../Components/Templates/Dashboard/common/Table/TableCell";
import { BiPlus } from "react-icons/bi";
import ProductDrawer from "../../../../../Components/Templates/Dashboard/common/ProductDrawer";
import useProducts from "../../../../../hooks/useProducts";
import { formatPrice, getDisplayPrice } from "../../../../../lib/helpers/price";

function ModeratorProductsTable() {
  const [isDrawerShow, setIsDrawerShow] = useState(false);
  const toggleDrawer = () => setIsDrawerShow((prev) => !prev);

  const { products, pagination, page, setPage, isLoading, error } =
    useProducts();

  return (
    <>
      <Table>
        <TableToolbar useFlexBetween>
          <div>
            <h2>تمامی محصولات</h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDrawer}
              className="px-3 hover:opacity-90 flex items-center h-10 rounded-md bg-blue-500 text-white"
            >
              <BiPlus />
              <span>ایجاد محصول</span>
            </button>
          </div>
        </TableToolbar>
        <TableHead>
          <TableRow>
            <TableCell>شناسه</TableCell>
            <TableCell>عنوان</TableCell>
            <TableCell>مبلغ</TableCell>
          </TableRow>
        </TableHead>
        {isLoading && (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-zinc-400">
              در حال بارگزاری
            </TableCell>
          </TableRow>
        )}

        {!isLoading && error && (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-red-400">
              {error || "خطا در دریافت محصولات"}
            </TableCell>
          </TableRow>
        )}

        {!isLoading && !error && products.length === 0 && (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-red-400">
              هنوز محصولی ثبت نشده
            </TableCell>
          </TableRow>
        )}
        <TableBody>
          {!isLoading &&
            !error &&
            products.map((product) => {
              const { price, hasMultipleSellers } = getDisplayPrice(product.sellers);
              return (
                <TableRow>
                  <TableCell>{product.shortIdentifier}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    {formatPrice(price)} تومان
                    {hasMultipleSellers && " (چند فروشنده دارد)"}
                    </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <ProductDrawer isOpen={isDrawerShow} onToggle={toggleDrawer} />
    </>
  );
}

export default ModeratorProductsTable;
