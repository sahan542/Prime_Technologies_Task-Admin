/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";

type TMultiImageUploaderProps = {
  name: string;
  className?: string;
};

const MTMultiImageUploader = ({
  name,
  className,
}: TMultiImageUploaderProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <div className={`relative ${className}`}>
            <Input
              {...field}
              type="file"
              multiple
              className="h-11 w-full text-sm text-gray-600 file:mr-4 file:mt-1 file:px-4 file:rounded-md file:border file:text-sm file:font-medium file:bg-transparent file:cursor-pointer cursor-pointer"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                onChange(files);
              }}
            />
          </div>
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {(errors[name]?.message as string) || "Invalid files"}
        </p>
      )}
    </div>
  );
};

export default MTMultiImageUploader;
