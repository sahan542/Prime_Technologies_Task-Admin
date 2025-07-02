"use client";

import { Controller, useFormContext } from "react-hook-form";
import TextEditor from "../TextEditor/TextEditor";

type TISTextEditorProps = {
  name: string;
  className?: string;
};

const MTTextEditor = ({ name, className }: TISTextEditorProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextEditor content={field.value || ""} onChange={field.onChange} />
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {(errors[name]?.message as string) || "Invalid input"}
        </p>
      )}
    </div>
  );
};

export default MTTextEditor;
