import * as React from "react";
import { useForm as useHookForm, Controller, ControllerProps, FieldPath, FieldValues, FormProvider, UseFormProps, UseFormReturn } from "react-hook-form";

interface FormProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: (values: T) => void;
  form: UseFormReturn<T>;
}

function Form<T extends FieldValues>({
  children,
  onSubmit,
  form,
  ...props
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
}

interface FormFieldProps<T extends FieldValues, U extends FieldPath<T>> {
  name: U;
  control: UseFormReturn<T>["control"];
  render: ControllerProps<T, U>["render"];
}

function FormField<T extends FieldValues, U extends FieldPath<T>>({
  name,
  control,
  render,
}: FormFieldProps<T, U>) {
  return <Controller name={name} control={control} render={render} />;
}

interface FormItemProps {
  className?: string;
  children: React.ReactNode;
}

function FormItem({ className, children }: FormItemProps) {
  return <div className={`space-y-2 ${className || ""}`}>{children}</div>;
}

interface FormLabelProps {
  className?: string;
  htmlFor?: string;
  children: React.ReactNode;
}

function FormLabel({ className, htmlFor, children }: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ""}`}
    >
      {children}
    </label>
  );
}

interface FormControlProps {
  className?: string;
  children: React.ReactNode;
}

function FormControl({ className, children }: FormControlProps) {
  return <div className={`mt-1 ${className || ""}`}>{children}</div>;
}

interface FormMessageProps {
  className?: string;
  children?: React.ReactNode;
}

function FormMessage({ className, children }: FormMessageProps) {
  return (
    <p className={`text-sm font-medium text-red-500 ${className || ""}`}>
      {children}
    </p>
  );
}

interface FormDescriptionProps {
  className?: string;
  children?: React.ReactNode;
}

function FormDescription({ className, children }: FormDescriptionProps) {
  return (
    <p className={`text-sm text-gray-500 ${className || ""}`}>
      {children}
    </p>
  );
}

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
};
