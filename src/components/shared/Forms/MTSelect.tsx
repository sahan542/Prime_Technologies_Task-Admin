"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";

type TSelectOption = {
  label: string;
  value: string;
};

type TISSelectProps = {
  name: string;
  options: TSelectOption[];
  placeholder?: string;
  className?: string;
};

const MTSelect = ({
  name,
  options,
  placeholder,
  className,
}: TISSelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger
              className={`${className} h-11 w-full cursor-pointer rounded-md border border-black bg-white px-3 py-5 text-sm shadow-xs `}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors[name] && (
        <p className="text-sm text-red-500">
          {(errors[name]?.message as string) || "Invalid selection"}
        </p>
      )}
    </div>
  );
};

export default MTSelect;
