import React, { useState } from "react";
import Confirm from "../../../../../Components/Common/Confirm";
import ProductDrawer from "../../../../../Components/Templates/Dashboard/common/ProductDrawer";
import useProducts from "../../../../../hooks/useProducts";
import Table from "../../../../../Components/Templates/Dashboard/common/Table";
import TableToolbar from "../../../../../Components/Templates/Dashboard/common/Table/TableToolbar";
import { BiPlus } from "react-icons/bi";
import TableHead from "../../../../../Components/Templates/Dashboard/common/Table/TableHead";
import TableRow from "../../../../../Components/Templates/Dashboard/common/Table/TableRow";
import TableCell from "../../../../../Components/Templates/Dashboard/common/Table/TableCell";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineModeEdit } from "react-icons/md";
import TableBody from "../../../../../Components/Templates/Dashboard/common/Table/TableBody";
import { formatPrice, getDisplayPrice } from "../../../../../lib/helpers/price";
import useCategories from "../../../../../hooks/useCategories";

function ModeratorCategoriesTable() {
  const [DeletingProduct, setDeletingProduct] = useState();
  const [isDeleting, setIsDeleting] = useState(null);

  const [isEditing, setIsEditing] = useState(null);

  const [isDrawerShow, setIsDrawerShow] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerShow((prev) => !prev);
    setIsEditing(false);
  };

  const { isLoading, categories, reFetchCategories, error } = useCategories();

  //   const handleRemove = async () => {
  //     setIsDeleting(true);

  //     try {
  //       const data = await removeProduct(DeletingProduct._id);
  //       toast.success("حذف محصول با موفقیت انجام شد");
  //       reFetchCategories();
  //       console.log("data", data);
  //     } catch (err) {
  //       console.log("err.response", err.response);
  //       toast.error(err.response.data.message || "خطا در حذف محصول");
  //     } finally {
  //       setIsDeleting(false);
  //       setDeletingProduct(null);
  //     }
  //   };

  return (
    <>
      <Table>
        <TableToolbar useFlexBetween>
          <div>
            <h2>تمامی دسته بندی ها</h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDrawer}
              className="px-3 hover:opacity-90 flex items-center h-10 rounded-md bg-blue-500 text-white"
            >
              <BiPlus />
              <span>ایجاد دسته بندی</span>
            </button>
          </div>
        </TableToolbar>
        <TableHead>
          <TableRow>
            <TableCell>عنوان</TableCell>
            <TableCell>تعدا د فیلتر ها</TableCell>
            <TableCell>تعداد زیر دسته بندی</TableCell>
            <TableCell>عملیات</TableCell>
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
              {error || "خطا در دریافت دسته بندی ها"}
            </TableCell>
          </TableRow>
        )}

        {!isLoading && !error && categories.length === 0 && (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-red-400">
              هنوز دسته بندی ثبت نشده
            </TableCell>
          </TableRow>
        )}
        <TableBody>
          {!isLoading &&
            !error &&
            categories.map((category) => {
              return (
                <TableRow>
                  <TableCell>{category.title}</TableCell>
                  <TableCell>{category.filters.length}</TableCell>
                  <TableCell>{category.subCategories.length}</TableCell>
                  <TableCell>
                    <button
                      className="text-blue-400 hover:bg-blue-100 p-2 rounded-md"
                      onClick={() => {
                        setIsEditing(category);
                        setIsDrawerShow(true);
                      }}
                    >
                      <MdOutlineModeEdit />
                    </button>
                    <button
                      className="text-red-400 hover:bg-red-100 p-2 rounded-md"
                      title="حذف"
                      onClick={() => setDeletingProduct(category)}
                    >
                      <FaRegTrashCan />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>

        {/* {pagination && pagination.totalPrice > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              className="px-3 py-1 rounded-md primary-border text-sm disabled:opacity-40"
              disabled={page <= 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              قبلی
            </button>
            {console.log("pagination:", pagination)}
            <span>
              صفحه {pagination.page} از {pagination.tottalPages}
            </span>
            <button
              className="px-3 py-1 rounded-md primary-border text-sm disabled:opacity-40"
              disabled={page > pagination.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              بعدی
            </button>
          </div>
        )} */}

        {/* <Confirm
          isOpen={!!DeletingProduct}
          title="حذف محصول"
          description={`آیا از حذف محصول ${DeletingProduct?.name} اطمینان دارید؟ این عملیات غیر قابل بازگشت میباشد`}
          onConfirm={handleRemove}
          onCancel={() => setDeletingProduct(null)}
          isLoading={isDeleting}
        /> */}
      </Table>
      {/* <ProductDrawer
        isOpen={isDrawerShow}
        onToggle={toggleDrawer}
        editingMode={isEditing}
      /> */}
    </>
  );
}

export default ModeratorCategoriesTable;
