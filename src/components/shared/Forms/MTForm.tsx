import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";
import { ZodSchema } from "zod";

type TFormProps<T extends FieldValues> = {
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
  defaultValues: UseFormProps<T>["defaultValues"];
  schema?: ZodSchema<T>;
};

const MTForm = <T extends FieldValues>({
  children,
  onSubmit,
  defaultValues,
  schema,
}: TFormProps<T>) => {
  const formConfig: UseFormProps<T> = {
    defaultValues,
    ...(schema && { resolver: zodResolver(schema) }),
  };

  const methods = useForm<T>(formConfig);

  const submit: SubmitHandler<T> = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default MTForm;
