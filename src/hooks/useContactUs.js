import { useState } from "react";
import { toast } from "sonner";
import validate from "../validators";
import { contactUsSchema } from "../validators/cantactUs";
import sendContactUsMessage from "../services/contactUs.services";

const useContactUs = (initializeForm) => {
  const [form, setForm] = useState(initializeForm);

  const [isSubmiting, setIsSubmiting] = useState(false);

  const changeHandler = ({ target }) => {
    const { name, value } = target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (isSubmiting) return;

    const result = validate(contactUsSchema, form);

    if (result) {
      setIsSubmiting(true);

      const response = sendContactUsMessage(form);

      toast.promise(response, {
        loading: "در حال ارسال ...",
        success: () => {
          setForm(initializeForm);
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

  return { form, isSubmiting, changeHandler, submitHandler };
};

export default useContactUs;
