"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";

import CustomFormField from "../customForms/CustomFormField";
import SubmitButton from "../ui/SubmitButton";
import { PatientFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, genderOptions, IdentificationTypes } from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";
import { PatientFormDefaultValues } from "@/constants";
import { registerPatient } from "@/lib/actions/patient.actions";

export enum FormFieldTypes {
  INPUT = "input",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SKELETON = "skeleton",
  SELECT = "select",
  TEXTAREA = "textarea",
}

const RegistrationForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);
    try {
      let formData;
      if (
        values.identificationDocument &&
        values.identificationDocument.length > 0
      ) {
        const blobFile = new Blob([values.identificationDocument[0]], {
          type: values.identificationDocument[0].type,
        });

        formData = new FormData();
        formData.append("blobFile", blobFile);
        formData.append("fileName", values.identificationDocument[0].name);

        const patientData = {
          ...values,
          userId: user.$id,
          birthDate: new Date(values.birthDate),
          identificationDocument: formData,
        };

        //Below comments to be added to ignore typscript error
        //@ts-ignore
        // const patient = await registerPatient(patientData);

        // if (patient) router.push(`/patient/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.log("Some error on Submit:", error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          name="name"
          fieldType={FormFieldTypes.INPUT}
          label="Full Name"
          placeholder="Jon Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            name="email"
            fieldType={FormFieldTypes.INPUT}
            label="Email"
            placeholder="Jondoe@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            control={form.control}
            name="phone"
            fieldType={FormFieldTypes.PHONE_INPUT}
            label="Phone"
            placeholder="+91 6473523846"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            name="birthDate"
            fieldType={FormFieldTypes.DATE_PICKER}
            label="Date of Birth"
            iconAlt="calendar"
            iconSrc="/assets/icons/calendar.svg"
          />
          <CustomFormField
            control={form.control}
            name="gender"
            fieldType={FormFieldTypes.SKELETON}
            label="Gender"
            renderSkeleton={(field) => {
              return (
                <FormControl>
                  <RadioGroup
                    className=" flex gap-6 h-11 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {genderOptions.map((option) => {
                      return (
                        <div key={option} className="radio-group">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option} className="cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              );
            }}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            name="adress"
            fieldType={FormFieldTypes.INPUT}
            label="Address"
            placeholder="14th Street New York"
          />
          <CustomFormField
            control={form.control}
            name="occupation"
            fieldType={FormFieldTypes.INPUT}
            label="Occupation"
            placeholder="Software Engineer"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            name="emergencyContactName"
            fieldType={FormFieldTypes.INPUT}
            label="Emergency Contact Name"
            placeholder="Guardian's Name"
          />
          <CustomFormField
            control={form.control}
            name="emergencyContactNumber"
            fieldType={FormFieldTypes.PHONE_INPUT}
            label="Emergency Contact Number"
            placeholder="+91 6473523846"
          />
        </div>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldTypes.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Primary Physician"
          placeholder="Select a Physician"
        >
          {Doctors.map((doctor) => {
            return (
              <SelectItem key={doctor.name} value={doctor.name}>
                <div className="flex cursor-pointer gap-2 items-center">
                  <Image
                    src={doctor.image}
                    height={32}
                    width={32}
                    alt={doctor.name}
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            );
          })}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            name="insuranceProvider"
            fieldType={FormFieldTypes.INPUT}
            label="Insurance Provider"
            placeholder="BlueCross BlueShield"
          />
          <CustomFormField
            control={form.control}
            name="insurancePolicyNumber"
            fieldType={FormFieldTypes.INPUT}
            label="Insurance Policy Number"
            placeholder="ABC1234567"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            name="allergies"
            fieldType={FormFieldTypes.TEXTAREA}
            label="Allergies (if any)"
            placeholder="Peanuts, Eggs, Pollens"
          />
          <CustomFormField
            control={form.control}
            name="currentMedication"
            fieldType={FormFieldTypes.TEXTAREA}
            label="Current Medication (if any)"
            placeholder="Ibuprofen 200mg, Paracetamole 500mg"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            name="familyMedicalHistory"
            fieldType={FormFieldTypes.TEXTAREA}
            label="Family Medical History"
            placeholder="No family history of any disease"
          />
          <CustomFormField
            control={form.control}
            name="pastMedicalHistory"
            fieldType={FormFieldTypes.TEXTAREA}
            label="Past Medical History"
            placeholder="Sugar"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verifications</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldTypes.SELECT}
          control={form.control}
          name="identificationType"
          label="Identification Type"
          placeholder="Select an identification type"
        >
          {IdentificationTypes.map((type) => {
            return (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            );
          })}
        </CustomFormField>

        <CustomFormField
          control={form.control}
          name="identificationNumber"
          fieldType={FormFieldTypes.INPUT}
          label="Identification Number"
          placeholder="DSQM1234M"
        />

        <CustomFormField
          control={form.control}
          name="identificationDocument"
          fieldType={FormFieldTypes.SKELETON}
          label="Scanned Copy of Identification Document"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          name="treatmentConsent"
          fieldType={FormFieldTypes.CHECKBOX}
          label="I consent to treatment"
        />
        <CustomFormField
          control={form.control}
          name="disclosuerConsent"
          fieldType={FormFieldTypes.CHECKBOX}
          label="I consent to disclosure of information"
        />
        <CustomFormField
          control={form.control}
          name="privacyConsent"
          fieldType={FormFieldTypes.CHECKBOX}
          label="I consent to privacy policy"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegistrationForm;
