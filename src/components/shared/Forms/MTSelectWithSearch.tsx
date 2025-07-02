"use client";

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
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
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

const MTSelectWithSearch = ({
  name,
  options,
  placeholder = "Select an option",
  className,
}: TISSelectProps) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedValue = watch(name);
  const [open, setOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || placeholder;

  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <div className="space-y-1">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn(
                  "w-full border rounded h-11 text-left cursor-pointer text-[15px] flex items-center justify-between",
                  !selectedValue && "text-gray-400",
                  className
                )}
              >
                <span>{selectedLabel}</span>
                <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
              </button>
            </PopoverTrigger>

            <PopoverContent className="z-[999] p-0 bg-white">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={(val) => {
                        setValue(name, val, { shouldValidate: true });
                        setOpen(false);
                      }}
                    >
                      {option.label}
                      {selectedValue === option.value && (
                        <Check className="ml-auto h-4 w-4 text-primary" />
                      )}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {errors[name] && (
            <p className="text-sm text-red-500">
              {(errors[name]?.message as string) || "Invalid selection"}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default MTSelectWithSearch;
