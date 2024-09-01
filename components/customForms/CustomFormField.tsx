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
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

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
    const {
      iconSrc,
      iconAlt,
      placeholder,
      dateFormat,
      showTimeSelect,
      renderSkeleton,
    } = props;
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
      case FormFieldTypes.TEXTAREA:
        return (
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              className="shad-textArea"
              disabled={props.disabled}
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
      case FormFieldTypes.DATE_PICKER:
        return (
          <div className="flex rounded-md border border-dark-500 bg-dark-400">
            <Image
              src={iconSrc!}
              height={24}
              width={24}
              alt={iconAlt!}
              className="ml-1"
            />
            <FormControl>
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat={dateFormat ?? "MM/dd/yyyy"}
                showTimeSelect={showTimeSelect ?? false}
                timeInputLabel="Time:"
                wrapperClassName="date-picker"
              />
            </FormControl>
          </div>
        );
        break;
      case FormFieldTypes.SKELETON:
        // console.log("Under Case", field);
        return renderSkeleton ? renderSkeleton(field) : null;
        break;
      case FormFieldTypes.SELECT:
        return (
          <FormControl>
            <Select defaultValue={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <FormControl className="shad-select-trigger">
                  <SelectValue placeholder={placeholder} />
                </FormControl>
              </SelectTrigger>
              <SelectContent className="shad-select-content">
                {props.children}
              </SelectContent>
            </Select>
          </FormControl>
        );
        break;
      case FormFieldTypes.CHECKBOX:
        return (
          <FormControl>
            <div className="flex items-center gap-4">
              <Checkbox
                id={props.name}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <Label htmlFor={props.name} className="checkbox-label">
                {props.label}
              </Label>
            </div>
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
