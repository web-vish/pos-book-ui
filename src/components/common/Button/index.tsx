import React from "react";
import styles from "./Button.module.scss";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  option?: "primary" | "secondary" | "link";
}

const Button = ({ text, option="primary", ...props }: ButtonProps) => {
  /* istanbul ignore next @preserve*/
  const classNames = [styles.button, styles[option]].join(" ");
  return (
    <button
      className={classNames}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
