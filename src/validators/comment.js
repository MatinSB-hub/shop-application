import z, { number, string } from "zod";

export const commentSchema = z.object({
  content: string("لطفا متن کامت رو وارد کنید")
    .trim()
    .min(4, "متن کامنت باید حداقل 4 کارکتر باشد")
    .max(500, "متن کامنت میتواند حداکثر 500 کارکتر باشد"),
  rating: number().refine((rate) => rate > 0, {
    message: "لطفا در امتیاز دهی شرکت کنید",
  }),
});
