import { Textarea } from "@/components/ui/textarea";
import { Controller, useFormContext } from "react-hook-form";

type TTextAreaProps = {
  name: string;
  className?: string;
  placeholder?: string;
  rows?: number;
};

const MTTextArea = ({
  name,
  className = "",
  placeholder = "",
  rows = 4,
}: TTextAreaProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Textarea
            {...field}
            className={`${className}`}
            placeholder={placeholder}
            rows={rows}
          />
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

export default MTTextArea;
