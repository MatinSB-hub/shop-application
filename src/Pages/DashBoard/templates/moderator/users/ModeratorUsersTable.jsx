import React, { useState } from "react";
import useUsers from "../../../../../hooks/useUsers";
import Table from "../../../../../Components/Templates/Dashboard/common/Table";
import TableToolbar from "../../../../../Components/Templates/Dashboard/common/Table/TableToolbar";
import { BiPlus } from "react-icons/bi";
import TableHead from "../../../../../Components/Templates/Dashboard/common/Table/TableHead";
import TableRow from "../../../../../Components/Templates/Dashboard/common/Table/TableRow";
import TableCell from "../../../../../Components/Templates/Dashboard/common/Table/TableCell";
import TableBody from "../../../../../Components/Templates/Dashboard/common/Table/TableBody";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

function ModeratorUsersTable() {
  const [DeletingProduct, setDeletingProduct] = useState();
  const [isDeleting, setIsDeleting] = useState(null);

  const [isEditing, setIsEditing] = useState(null);

  const [isDrawerShow, setIsDrawerShow] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerShow((prev) => !prev);
    setIsEditing(false);
  };

  const { users, pagination, page, setPage, isLoading, error, reFetchUsers } =
    useUsers();

  //   console.log(users)

  //   const handleRemove = async () => {
  //     setIsDeleting(true);

  //     try {
  //       const data = await removeProduct(DeletingProduct._id);
  //       toast.success("حذف محصول با موفقیت انجام شد");
  //       reFetchProducts();
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
            <h2>تمامی محصولات</h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDrawer}
              className="px-3 hover:opacity-90 flex items-center h-10 rounded-md bg-blue-500 text-white"
            >
              <BiPlus />
              <span>ایجاد کاربر جدید</span>
            </button>
          </div>
        </TableToolbar>
        <TableHead>
          <TableRow>
            <TableCell>شناسه</TableCell>
            <TableCell>اسم</TableCell>
            <TableCell>شماره تماس</TableCell>
            <TableCell>نقش</TableCell>
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
              {error || "خطا در دریافت محصولات"}
            </TableCell>
          </TableRow>
        )}

        {!isLoading && !error && users.length === 0 && (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-red-400">
              هنوز محصولی ثبت نشده
            </TableCell>
          </TableRow>
        )}
        <TableBody>
          {!isLoading &&
            !error &&
            users.map((user) => {
              return (
                <TableRow>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.roles[0]}</TableCell>
                  <TableCell>
                    <button
                      className="text-blue-400 hover:bg-blue-100 p-2 rounded-md"
                      onClick={() => {
                        setIsEditing(user);
                        setIsDrawerShow(true);
                      }}
                    >
                      <MdOutlineModeEdit />
                    </button>
                    <button
                      className="text-red-400 hover:bg-red-100 p-2 rounded-md"
                      title="حذف"
                      onClick={() => setDeletingProduct(user)}
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

export default ModeratorUsersTable;
