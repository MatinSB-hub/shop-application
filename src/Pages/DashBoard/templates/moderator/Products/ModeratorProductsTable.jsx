import React, { useState } from "react";
import Table from "../../../../../Components/Templates/Dashboard/common/Table";
import TableToolbar from "../../../../../Components/Templates/Dashboard/common/Table/TableToolbar";
import TableRow from "../../../../../Components/Templates/Dashboard/common/Table/TableRow";
import TableBody from "../../../../../Components/Templates/Dashboard/common/Table/TableBody";
import TableHead from "../../../../../Components/Templates/Dashboard/common/Table/TableHead";
import TableCell from "../../../../../Components/Templates/Dashboard/common/Table/TableCell";
import { BiPlus } from "react-icons/bi";
import ProductDrawer from "../../../../../Components/Templates/Dashboard/common/ProductDrawer";

function ModeratorProductsTable() {
  const [isDrawerShow, setIsDrawerShow] = useState(false);
  const toggleDrawer = () => setIsDrawerShow((prev) => !prev);
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
            <TableCell>وضعیت</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>cd53se</TableCell>
            <TableCell>laptop asus</TableCell>
            <TableCell>{150_000_00}</TableCell>
            <TableCell>public</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <ProductDrawer isOpen={isDrawerShow} onToggle={toggleDrawer} />
    </>
  );
}

export default ModeratorProductsTable;
