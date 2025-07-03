import React from "react";
import styles from "./InputForm.module.scss";
export interface InputFormProps {
  type: string;
  label: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
}
const InputForm: React.FC<InputFormProps> = ({
  type,
  label,
  id,
  required,
  placeholder,
  ...props
}: InputFormProps) => {
  return (
    <div className={styles.inputForm}>
      <label htmlFor={id || label}>{label} :</label>
      <input
        type={type}
        required={required}
        id={id || label}
        placeholder={placeholder || ""}
        {...props}
      />
    </div>
  );
};

export default InputForm;
