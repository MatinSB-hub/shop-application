import React from "react";

function ModeratorProductsTable() {
  return (
    <Table>
      <TableToolbar>
        <div>
          <h2>تمامی محصولات</h2>
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
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default ModeratorProductsTable;
