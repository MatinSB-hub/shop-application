import { toast } from "sonner";

const validate = (schema, data) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    toast.info(result.error.issues[0].message);
    return false;
  }
  return true;
};

export default validate;
