import React, { useRef } from "react";
import { BiImageAdd } from "react-icons/bi";
import { HiX } from "react-icons/hi";
const MAX_IMAGE = 10;

function ImageUploadField({ files, onChange }) {
  const inputRef = useRef(null);

  const isFull = files.length >= 10;

  const handleFiles = (e) => {
    const selectedImages = Array.from(e.target.files);
    const remaining = MAX_IMAGE - files.length;
    const ImageToAdd = selectedImages.slice(0, remaining);
    onChange([...files, ...ImageToAdd]);
  };

  const removeFile = (index) => {
    onChange(files.filter((_, i) => i != index));
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex justify-between items-center">
        <span>تصاویر محصول:</span>
        <span className=" text-zinc-500">
          {files.length} از {MAX_IMAGE}
        </span>
      </div>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        multiple
        onChange={handleFiles}
        accept="images/*"
      />

      <div className="grid grid-cols-4 gap-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-md overflow-hidden primary-border group"
          >
            <img
              src={URL.createObjectURL(file)}
              className="w-full h-full object-cover"
              alt=""
            />

            <button
              type="button"
              onClick={() => removeFile(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full size-5 text-xs flex items-center justify-center hover:bg-red-600"
            >
              <HiX />
            </button>
          </div>
        ))}

        {!isFull && (
          <button
            onClick={() => inputRef.current?.click()}
            type="button"
            className="aspect-square rounded-md primary-border border-dashed flex flex-col items-center justify-center gap-1 text-zinc-500 hover:bg-zinc-50 hover:text-blue-500 transition-colors"
          >
            <BiImageAdd className="text-xl" />
            <span className="text-[11px]">افزودن تصویر</span>
          </button>
        )}
      </div>

      {isFull && (
        <span className="w-max text-sm text-zinc-500">
          حداکثر تعداد تصویر انتخاب شده است ({MAX_IMAGE} عدد)
        </span>
      )}
    </div>
  );
}

export default ImageUploadField;
