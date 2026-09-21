import React, { useState } from "react";
import SectionTitle from "../Components/Common/SectionTitle";
import { useLocation } from "react-router";
import { number } from "zod";
import LocationPicker from "../Components/Templates/Checkout/components/LocationPicker";

function Checkout() {
  const loc = useLocation();

  const [position, setPosition] = useState();
  return (
    <div className="flex justify-center">
      <div className="w-[80%] flex flex-col gap-8 mt-8">
        <h2 className="text-3xl font-semibold">تکمیل سفارش</h2>
        <div className="w-full h-max flex gap-8">
          <div className="w-full h-max flex flex-col gap-5 bg-white p-5 rounded-2xl">
            <span className="text-2xl font-semibold">آدرس ارسال</span>
            <div className="flex flex-col gap-1">
              <label className="text-sm">آدرس</label>
              <textarea
                className="w-full h-25 border-3 primary-border rounded-2xl resize-none"
                placeholder="آدرس کامل خود را وارد کنید..."
              ></textarea>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">کد پستی</label>
              <input
                className="w-full h-12 border-3 primary-border rounded-2xl resize-none"
                placeholder="مثلا: 1234567890"
              ></input>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">شناسه شهر</label>
              <input
                className="w-full h-12 border-3 primary-border rounded-2xl resize-none"
                placeholder="City ID"
              ></input>

              <LocationPicker position={position} setPosition={setPosition} />
            </div>
          </div>
          <div className="min-w-max h-max flex flex-col gap-4 bg-white p-5 rounded-2xl">
            <span className="text-2xl font-semibold">خلاصه سفارش</span>
            <div className="w-full flex justify-between">
              <span>تعداد محصولات</span>
              <span>{`${loc.state.invoice.itemsCount} محصول`}</span>
            </div>
            <span>{`هزینه ارسال (${Number(23_328_000).toLocaleString("fa-IR")} ریال) محاسبه میشود`}</span>
            <hr className="text-gray-200 border" />
            <div className="w-full flex justify-between font-bold">
              <span>مبلغ قابل پرداخت</span>
              <span className="text-blue-700">{`${Number(loc.state.invoice.finalPrice).toLocaleString("fa-IR")} ریال`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
