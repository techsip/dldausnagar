import React from "react";
import "./style.css";
import { eraseCookie } from "../../utils";
import { useNavigate } from "react-router-dom";

interface Props {
  heading: string;
  checkAuth: (val: boolean) => void;
}
const Header = ({ heading, checkAuth }: Props) => {
  const onLogout = () => {
    eraseCookie("token");
    eraseCookie("name");
    eraseCookie("role");
    checkAuth(false);
  };
  return (
    <div className="header">
      <h2 style={{ textTransform: "uppercase" }}>{heading}</h2>
      <div className="logout" onClick={onLogout}>
        Logout
      </div>
    </div>
  );
};
export default Header;
