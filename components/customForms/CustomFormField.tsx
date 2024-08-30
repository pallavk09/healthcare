import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldTypes } from "../forms/patientForm";
import React from "react";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

interface CustomProps {
  control: Control<any>;
  name: string;
  fieldType: FormFieldTypes;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const CustomFormField = (props: CustomProps) => {
  const { control, name, fieldType, label } = props;
  const RenderField = ({
    field,
    props,
  }: {
    field: any;
    props: CustomProps;
  }) => {
    const { iconSrc, iconAlt, placeholder } = props;
    switch (fieldType) {
      case FormFieldTypes.INPUT:
        return (
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        );
        break;

      case FormFieldTypes.PHONE_INPUT:
        return (
          <FormControl>
            <PhoneInput
              placeholder={placeholder}
              defaultCountry="US"
              international
              value={(field.value as string) || undefined}
              onChange={field.onChange}
              className="input-phone"
            />
          </FormControl>
        );
        break;
      default:
        break;
    }
    return <Input type="text" placeholder="John doe" />;
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldTypes.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
