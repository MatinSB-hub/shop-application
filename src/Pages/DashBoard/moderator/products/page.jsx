import React from 'react'
import PageLable from "../../ui/PageLable"
function ModeratorsProducts() {
  return (
    <div className="space-y-10">
      <PageLable lable="مدیریت محصولات فروشگاه" />
      <ModeratorProductsTable/>
    </div>
  )
}

export default ModeratorsProducts