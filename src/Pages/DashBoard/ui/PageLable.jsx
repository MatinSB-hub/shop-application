import React from 'react'

function PageLable({lable}) {
  return (
    <div className="w-full h-0.5 bg-zinc-300 flex justify-center items-center rounded-2xl"s>
      <span className="px-10 py-3 bg-zinc-50 text-sm">{lable}</span>
    </div>
  )
}

export default PageLable