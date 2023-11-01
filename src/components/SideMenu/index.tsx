import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

interface Props {
  setSelectedtool: any;
  isAdmin: boolean;
}
const SideMenu = ({ setSelectedtool, isAdmin }: Props) => {
  let items: MenuProps["items"] = [
    getItem("Dashboard", ""),
    getItem("Flats", "flats"),
    getItem("Users", "users"),
  ];
  if (isAdmin) {
    items = [...items, getItem("Admins", "admins")];
  }
  const navigate = useNavigate();
  const location = useLocation();
  const onClick: MenuProps["onClick"] = (e: any) => {
    console.log("click ", e);
    setSelectedtool(e?.domEvent?.target?.outerText);
    navigate(e?.key);
  };

  const getDefaultSelectedKeys = () => {
    const key = location.pathname.replace("/", "");
    return items?.find((item) => item?.key === key)?.key?.toString() || "";
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 240 }}
      defaultSelectedKeys={[getDefaultSelectedKeys()]}
      mode="inline"
      items={items}
    />
  );
};

export default SideMenu;