import React from "react";
import { NavLink } from "react-router";
import styles from "./AppNavLink.module.scss";

export interface AppNavLinkProps {
  path: string;
  label: string;
  isEnd?: boolean;
}
const AppNavLink: React.FC<AppNavLinkProps> = ({ path, label, isEnd=false }: AppNavLinkProps) => {

  const getClassName = (isActive:Boolean) =>{
    /* istanbul ignore next @preserve */
    return isActive ? styles.active : "";

  };
  return (
    <NavLink to={path} className={({ isActive }) => getClassName(isActive)} end={isEnd}>
      {label}
    </NavLink>
  );
};

export default AppNavLink;
