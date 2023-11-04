import React from "react";
import FlatList from "../Flats/FlatList";
import Header from "../../components/Header";
import { Typography } from "antd";
import { getCookie } from "../../utils";
import "./style.css";
const { Title } = Typography;

const Home = () => {
  return (
    <Typography style={{ textAlign: "center" }} className="dashboard-container">
      <Title className="dashboard-title">
        <img
          src="/assets/images/logo.png"
          alt="logo"
          className="dashboard-logo"
        />
        Welcome {getCookie("name")} to DLDA US Nagar Portal
      </Title>
    </Typography>
  );
};

export default Home;
