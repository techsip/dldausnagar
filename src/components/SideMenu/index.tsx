import React from "react";
import {
  AppstoreOutlined,
  ControlOutlined,
  HomeOutlined,
  MailOutlined,
  MenuOutlined,
  SettingOutlined,
  UserOutlined,
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
    getItem("Dashboard", "", <MenuOutlined />),
    getItem("Flats", "flats", <HomeOutlined />),
    getItem("Users", "users", <UserOutlined />),
  ];
  if (isAdmin) {
    items = [
      ...items,
      getItem("MIS Report", "mis-report", <ControlOutlined />),
      getItem("Admins", "admins", <ControlOutlined />),
    ];
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
    <>
      <h3
        style={{
          position: "fixed",
          width: 239,
          textAlign: "center",
          height: 71,
          borderBottom: "1px solid #1b6614",
          borderRight: "1px solid #1b6614",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
        }}
      >
        DLDA US NAGAR
      </h3>
      <Menu
        onClick={onClick}
        style={{ width: 240, paddingTop: 70 }}
        defaultSelectedKeys={[getDefaultSelectedKeys()]}
        mode="inline"
        items={items}
      />
    </>
  );
};

export default SideMenu;
