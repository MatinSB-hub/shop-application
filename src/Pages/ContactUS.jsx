import { Link } from "react-router";
import SectionTitle from "../Components/Common/SectionTitle";
import InputField from "../Components/Templates/ContactUS/InputField";
import { useState } from "react";
import axios, { Axios } from "axios";
import { toast } from "sonner";

const ContactUSPage = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    subject: "",
    content: "",
  });

  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);

  const [isSubmiting, setIsSubmiting] = useState(false);

  const changeHandler = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const FormValidationHandler = () => {
    let isValid = true;

    if (form.name.length < 2) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    if (form.phone.length < 11 || form.phone.length > 11) {
      setPhoneError(true);
      isValid = false;
    } else {
      setPhoneError(false);
    }

    if (form.content.length < 10) {
      setContentError(true);
      isValid = false;
    } else {
      setContentError(false);
    }

    if (form.subject.length < 3) {
      setSubjectError(true);
      isValid = false;
    } else {
      setSubjectError(false);
    }

    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (FormValidationHandler()) {
      setIsSubmiting(true);

      const response = axios.post(
        "https://shopino.iran.liara.run/v1/contact-us/",
        form,
      );

      toast.promise(response, {
        loading: "در حال ارسال ...",
        success: () => {
          setForm({
            name: "",
            phone: "",
            subject: "",
            content: "",
          });
          setIsSubmiting(false);
          return "با موفقیت ارسال شد";
        },
        error: (error) => {
          return error.response.data.data.message || "ارسال ناموفق";
          setIsSubmiting(false);
        },
      });
    }
  };

  return (
    <main className="my-20 container" id="contact-us">
      <SectionTitle
        text="با ما تماس بگیرید"
        description="از طریق فرم زیر با ما تماس بگیرید و تیم فنی شاپینو در اسرع وقت به راهنمایی شما پاسخ خواهند داد."
      />

      <div
        id="contact-area"
        className="grid grid-cols-2 gap-10 p-5 border rounded-3xl border-neutral-300 mt-10"
      >
        <div className="w-full">
          <p className="mb-10 text-sm text-neutral-600">
            کاربر محترم, برای پاسخگویی بهتر لطفا تمامی فیلد های زیر را تکمیل
            کنید.
          </p>
          <div className="grid grid-cols-2 gap-5 **:w-full">
            <div>
              <InputField
                onChange={changeHandler}
                value={form.name}
                placeholder="مثال: امین سعیدی"
                label="نام و نام خانوادگی"
                name="name"
              />
              {nameError ? (
                <p className="text-red-500 text-sm mt-2">
                  نام و نام خانوادگی باید حداقل 2 حرف باشد
                </p>
              ) : null}
            </div>
            <div>
              <InputField
                value={form.phone}
                onChange={changeHandler}
                placeholder="مثال: 09911871596"
                label="شماره موبایل"
                name="phone"
              />
              {phoneError ? (
                <p className="text-red-500 text-sm mt-2">
                  شماره موبایل باید 11 رقم باشد
                </p>
              ) : null}
            </div>

            <div>
              <InputField
                value={form.subject}
                onChange={changeHandler}
                type="text"
                placeholder="مثال: مرجوع کردن محصول"
                fullWidth
                label="موضوع شما"
                name="subject"
              />
              {subjectError ? (
                <p className="text-red-500 text-sm mt-2">
                  عنوان باید حداقل 3 حرف باشد
                </p>
              ) : null}
            </div>

            <div className="col-span-2">
              <label
                htmlFor="contact-message"
                className="text-xs select-none text-neutral-500"
              >
                محتوا:
              </label>
              <textarea
                id="contact-message"
                value={form.content}
                onChange={changeHandler}
                className={`h-10 rounded-md mt-2.5 border text-sm py-4 min-h-[140px] border-neutral-200 ring-offset-2 px-4 duration-150 focus-within:ring-4 ring-sky-400/40 focus-within:outline-none`}
                placeholder="مثال: قصد مرجوعی محصول با شناسه #124214 را دارم"
                name="content"
              ></textarea>
              {contentError ? (
                <p className="text-red-500 text-sm">
                  {" "}
                  محتوا باید حداقل 10 حرف باشد
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex items-center text-sm mt-10 justify-end gap-3">
            <Link to="/" className="text-red-600 px-4 underline cursor-pointer">
              انصراف
            </Link>

            <button
              type="submit"
              className={`bg-linear-to-t from-blue-600 px-4 py-2.5 rounded-md text-white cursor-pointer hover:opacity-90 focus-within:ring-4 ring-sky-300/50 ring-offset-2 duration-150 to-blue-400 max-w-max ${isSubmiting && "opacity-50"} `}
              onClick={submitHandler}
            >
              {isSubmiting ? "درحال ارسال ..." : "ثبت و ارسال"}
            </button>
          </div>
        </div>
        <div className="w-full">
          <img
            className="object-cover scale-80"
            src="/assets/static/contact-us.png"
          />
        </div>
      </div>
      <div className="space-y-10 my-10">
        <SectionTitle
          text="مراجعه حضوری"
          description="شما می‌توانید به صورت حضوری به یکی از دفاتر رسمی شاپینو مراجعه کنید و با همکاران ما در ارتباط باشید."
        />

        {/* <Maps /> */}
      </div>
    </main>
  );
};

export default ContactUSPage;
