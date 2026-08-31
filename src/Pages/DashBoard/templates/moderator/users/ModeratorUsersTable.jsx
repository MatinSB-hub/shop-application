import { useState } from "react";
import useUsers from "../../../../../hooks/useUsers";
import Table from "../../../../../Components/Templates/Dashboard/common/Table";
import TableToolbar from "../../../../../Components/Templates/Dashboard/common/Table/TableToolbar";
import { BiPlus } from "react-icons/bi";
import TableHead from "../../../../../Components/Templates/Dashboard/common/Table/TableHead";
import TableRow from "../../../../../Components/Templates/Dashboard/common/Table/TableRow";
import TableCell from "../../../../../Components/Templates/Dashboard/common/Table/TableCell";
import TableBody from "../../../../../Components/Templates/Dashboard/common/Table/TableBody";
import Confirm from "../../../../../Components/Common/Confirm";
import { IoBan } from "react-icons/io5";
import { toHijriDate } from "../../../../../lib/helpers/date";
import { banUser } from "../../../../../services/users.services";
import { toast } from "sonner";
import ModeratorTablesPagination from "../../../../../Components/Common/ModeratorTablesPagination";

// Mapping
const rolesLables = {
  USER: "کاربر",
  ADMIN: "مدیر",
  SELLER: "فروشنده",
};

function ModeratorUsersTable() {
  const [banningUser, setBanningUser] = useState();
  const [isBanning, setIsBanning] = useState(null);

  const [isEditing, setIsEditing] = useState(null);

  const [isDrawerShow, setIsDrawerShow] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerShow((prev) => !prev);
    setIsEditing(false);
  };

  const { users, pagination, page, setPage, isLoading, error, reFetchUsers } =
    useUsers();

  const handleBan = async () => {
    setIsBanning(true);

    try {
      const data = await banUser(banningUser._id);
      toast.success("بن کردن کاربر با موفقیت انجام شد");
      reFetchUsers();
      console.log("data", data);
    } catch (err) {
      console.log("err.response", err.response);
      toast.error(err.response.data.message || "خطا در بن کردن کاربر");
    } finally {
      setIsBanning(false);
      setBanningUser(null);
    }
  };

  return (
    <>
      <Table>
        <TableToolbar useFlexBetween>
          <div>
            <h2>تمامی کاربران</h2>
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
            <TableCell>تاریخ ثبت نام</TableCell>
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
                <TableRow key={user._id}>
                  <TableCell>...{user._id.slice(0, 6)}</TableCell>
                  <TableCell>{user.name || " فاقد نام "}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{toHijriDate(user.createdAt)}</TableCell>
                  <TableCell>
                    {user.roles.map((role) => rolesLables[role]).join(" - ")}
                  </TableCell>
                  <TableCell>
                    <button
                      className="text-red-400 hover:bg-red-100 p-2 rounded-md"
                      onClick={() => setBanningUser(user)}
                    >
                      <IoBan />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>

        <ModeratorTablesPagination
          pagination={pagination}
          setPage={setPage}
          page={page}
        />

        <Confirm
          isOpen={!!banningUser}
          title="بن کردن کاربر"
          description={`آیا از بن کردن کاربر ${banningUser?.name || "فاقد نام"} اطمینان دارید؟ این عملیات غیر قابل بازگشت میباشد`}
          onConfirm={handleBan}
          onCancel={() => setBanningUser(null)}
          isLoading={isBanning}
        />
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
