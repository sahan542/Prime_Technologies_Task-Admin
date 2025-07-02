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

type TMultiSelectWithExtraProps = {
  name: string;
  className: string;
  initialTags: string[];
};

const MTMultiSelectWithExtra = ({
  name,
  className,
  initialTags,
}: TMultiSelectWithExtraProps) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedTags = watch(name) || [];
  const [open, setOpen] = useState(false);

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setValue(name, [...selectedTags, tag]);
    }
    setOpen(false);
  };

  const removeTag = (tag: string) => {
    setValue(
      name,
      selectedTags.filter((t: string) => t !== tag)
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      render={() => (
        <div className="space-y-2">
          {/* Trigger Box */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div
                className={`flex flex-wrap gap-2 p-2 min-h-[40px] w-full cursor-pointer focus:outline-none border rounded-md ${className}`}
              >
                {selectedTags.length > 0 ? (
                  selectedTags.map((tag: string) => (
                    <Badge
                      key={tag}
                      className="mr-2 py-0 flex items-center gap-1 text-white"
                    >
                      {tag}
                      <span
                        onClick={(e) => {
                          e.stopPropagation(); // ✅ Prevent popover from closing or misfiring
                          removeTag(tag);
                        }}
                      >
                        <X className="w-3 h-3 cursor-pointer pointer-events-auto " />
                      </span>
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-600 text-sm px-2">
                    Select or add tags...
                  </span>
                )}
              </div>
            </PopoverTrigger>

            {/* Dropdown for selecting/adding tags */}
            <PopoverContent className="bg-white">
              <Command>
                <CommandInput
                  placeholder="Search or type a new tag..."
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      e.currentTarget.value.trim() !== ""
                    ) {
                      addTag(e.currentTarget.value.trim());
                      e.currentTarget.value = ""; // Clear input after adding tag
                      e.preventDefault(); // Prevent form submission
                    }
                  }}
                />
                <CommandList>
                  <CommandEmpty>
                    No tags found. Press Enter to add.
                  </CommandEmpty>
                  {initialTags.map((tag) => (
                    <CommandItem
                      key={tag}
                      className="cursor-pointer"
                      onSelect={() => addTag(tag)}
                    >
                      {tag}
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

export default MTMultiSelectWithExtra;
