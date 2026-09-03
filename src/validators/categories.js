import z, { file, nullable, optional, string } from "zod";
import { iconNames as allLucideIconNames } from "lucide-react/dynamic";

export const categoriesSchema = z.object({
  title: string()
    .trim()
    .min(3, "عنوان باید حداقل 3 کارکتر باشد")
    .max(20, "عنوان باید حداکثر 20 کرکتر باشد"),
  slug: string()
    .trim()
    .regex(/^[a-zA-Z]+$/, "لینک باید فقط شامل حروف انگلیسی باشد")
    .min(3, "لینک باید حداقل 3 کرکتر باشد")
    .max(20, "لینک باید حداکثر 20 کرکتر باشد"),
  description: optional(
    string()
      .min(10, "توضیحات باید حداقل 10 کرکتر باشد")
      .max(150, "توضیحات باید حداکثر 150 کرکتر باشد"),
  ),
  iconFile: z
    .instanceof(File) // بررسی اینکه شیء File است
    .nullable() // اجازه می‌دهد null باشد
    .optional() // اجازه می‌دهد undefined باشد
    .refine(
      (val) => {
        // اگر undefined یا null باشد → معتبر (چون اختیاری است)
        if (val === undefined || val === null) return true;

        // بررسی نوع فایل (اختیاری)
        const allowedTypes = [
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/svg+xml",
        ];
        if (!allowedTypes.includes(val.type)) {
          return false;
        }

        // بررسی حجم فایل (مثلاً کمتر از ۲ مگابایت)
        if (val.size > 2 * 1024 * 1024) {
          return false;
        }

        return true;
      },
      {
        message:
          "لطفاً یک فایل آیکون معتبر انتخاب کنید (فایل‌های مجاز: PNG, JPG, GIF, SVG - حداکثر ۲ مگابایت)",
      },
    ),
});
