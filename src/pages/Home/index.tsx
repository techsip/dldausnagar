import React from "react";
import FlatList from "../Flats/FlatList";
import Header from "../../components/Header";
import { Typography } from "antd";
import { getCookie } from "../../utils";
const { Title } = Typography;

const Home = () => {
  return (
    <Typography style={{ textAlign: "center" }}>
      <Title>Welcome {getCookie("name")} to DLDA US Nagar Portal</Title>
    </Typography>
  );
};

export default Home;
