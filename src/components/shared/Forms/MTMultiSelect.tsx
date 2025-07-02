"use client";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TSelectValue = {
  label: string;
  value: string;
};

type TMultiSelectProps = {
  name: string;
  className: string;
  selectValues: TSelectValue[];
  placeholder: string;
};

const MTMultiSelect = ({
  name,
  className,
  selectValues,
  placeholder,
}: TMultiSelectProps) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedValues: string[] = watch(name) || [];
  const [open, setOpen] = useState(false);

  const addFunction = (value: string) => {
    if (!selectedValues.includes(value)) {
      setValue(name, [...selectedValues, value]);
    }
    setOpen(false);
  };

  const removeFunction = (value: string) => {
    setValue(
      name,
      selectedValues.filter((v) => v !== value)
    );
  };

  const getName = (value: string) =>
    selectValues.find((singleValue) => singleValue.value === value)?.label ||
    value;

  return (
    <Controller
      control={control}
      name={name}
      render={() => (
        <div className="space-y-2">
          {/* Trigger Box */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="w-full focus:outline-none">
              <div
                className={`flex flex-wrap gap-2 p-2 min-h-[40px] w-full cursor-pointer focus:outline-none ${className}`}
              >
                {selectedValues.length > 0 ? (
                  selectedValues.map((value: string) => (
                    <Badge
                      key={value}
                      className="mr-2 py-1 flex items-center gap-1"
                    >
                      {getName(value)}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeFunction(value)}
                      />
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-400">{placeholder}...</span>
                )}
              </div>
            </PopoverTrigger>

            {/* Dropdown for selecting values */}
            <PopoverContent className="">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>Not found.</CommandEmpty>
                  {selectValues
                    .filter(
                      (singleValue) =>
                        !selectedValues.includes(singleValue.value)
                    )
                    .map((singleValue) => (
                      <CommandItem
                        key={singleValue.value}
                        className="cursor-pointer"
                        onSelect={() => addFunction(singleValue.value)}
                      >
                        {singleValue.label}
                      </CommandItem>
                    ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Error Message */}
          {errors[name] && (
            <p className="text-red-500 text-sm mt-1">
              {(errors[name]?.message as string) || "Invalid selection"}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default MTMultiSelect;
