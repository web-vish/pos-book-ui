import React from "react";
import styles from "./Navigation.module.scss";

export interface NavigationProps {
  type?: "top" | "aside";
  children?: React.ReactNode;
}

function Navigation({ type, children }: NavigationProps) {
  const [toggle, setToggle] = React.useState(false);
  const toggleShow = () => {
    setToggle(!toggle);
  };
  return (
    <div className={styles.navigationContainer + ' '}>
      {type === "aside" && (
        <div className={styles.expand + ' ' + styles[toggle? 'active' : '' ]} onClick={toggleShow} data-testid='toggle-button'>
          <div className={styles.bar1}></div>
          <div className={styles.bar2}></div>
          <div className={styles.bar3}></div>
        </div>
      )}
      <nav
        className={
          styles.navigation +
          " " +
          styles[type || "top"] +
          (toggle ? " " + styles.show : "")
        }
      >
        {children}
      </nav>
    </div>
  );
}

export default Navigation;
