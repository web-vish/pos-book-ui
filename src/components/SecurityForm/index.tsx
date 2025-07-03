import React from "react";
import InputForm from "../common/InputForm";
import styles from "./SecurityForm.module.scss";
import { useForm } from "react-hook-form";
import type { PageType } from "../../types";

export interface SecurityFormProps {
  formId: string;
  register: ReturnType<typeof useForm>["register"];
  pageType?: PageType;
}

const SecurityForm: React.FC<SecurityFormProps> = ({
  formId,
  register,
  pageType,
}: SecurityFormProps) => {
  return (
    <section className={styles.securityForm} id={formId}>
      <InputForm
        type="text"
        label="Account"
        placeholder="Account"
        required
        {...register(`${formId + "-account"}`)}
      />
      <InputForm
        type="text"
        label="Security"
        placeholder="Security"
        required
        {...register(`${formId + "-security"}`)}
      />
      {pageType !== "Cancel" ? (
        <InputForm
          type="text"
          label="Quantity"
          placeholder="Quantity"
          required
          {...register(`${formId + "-quantity"}`)}
        />
      ) : (
        <InputForm
          type="text"
          label="Event ID"
          required
          {...register(`${formId + "-eventId"}`)}
        />
      )}
    </section>
  );
};

export default SecurityForm;
