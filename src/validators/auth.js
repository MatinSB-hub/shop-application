import z, { string } from "zod";

export const sendOTPSchema = z.object({
  phone: string()
    .trim()
    .regex(/^09[0-9]{9}$/, "شماره تلفن باید با 09 شروع شود و 11 رقم باشد"),
});

export const verifyOTPSchema = z.object({
  phone: string()
    .trim()
    .regex(/^09[0-9]{9}$/, "شماره تلفن باید با 09 شروع شود و 11 رقم باشد"),

  otp: string()
    .trim()
    .min(4, "کد صحت باید 4 رقم باشد")
    .max(4, "کد صحت باید 4 رقم باشد"),
});
