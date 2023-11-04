import React, { useRef, useState } from "react";
import FlatList from "../Flats/FlatList";
import Header from "../../components/Header";
import {
  Button,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Table,
  Typography,
  message,
} from "antd";
import { getCookie } from "../../utils";
import "./style.css";
import { searchData } from "../../services/flats";
import { CSVLink } from "react-csv";
const { Title } = Typography;

const vacantColumns = [
  {
    title: "Flat",
    dataIndex: "flat_no",
    key: "flat_no",
  },
  {
    title: "Block",
    dataIndex: "block",
    key: "block",
  },
  {
    title: "Floor",
    dataIndex: "floor",
    key: "floor",
  },
];

const allotedColumns = [
  {
    title: "User Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Father Name",
    dataIndex: "father_name",
    key: "father_name",
  },
  {
    title: "Aadhar",
    dataIndex: "aadhar",
    key: "aadhar",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Survey Code",
    dataIndex: "sur_code",
    key: "sur_code",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Senior Citizen",
    dataIndex: "senior_citizen",
    key: "senior_citizen",
  },
  {
    title: "PWD",
    dataIndex: "pwd",
    key: "pwd",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Religion",
    dataIndex: "religion",
    key: "religion",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Income",
    dataIndex: "income",
    key: "income",
  },
];

const MisReport = () => {
  const [searchedData, setSearchedData] = useState<any>([]);
  const [disabledForVacant, setDisabledForVaccant] = useState(false);
  const formRef = useRef<FormInstance>(null);
  const onFinish = async (values: any) => {
    let payload: any = "";
    // console.log(
    //   "values",
    //   values,
    //   Object.keys(values)?.filter((key) => {
    //     if (values[key]) {
    //       return { key: values[key] };
    //     }
    //   })
    // );
    Object.keys(values)?.forEach((key) => {
      if (values[key]) {
        payload += `${key}=${values[key]}&`;
      }
    });
    if (!payload) {
      message.error("Select atleas one filter");
      return;
    }
    try {
      const res: any = await searchData(payload);
      if (Array.isArray(res)) {
        setSearchedData([...res]);
      }
      console.log("res", res);
    } catch (e) {}
  };

  const onValueChange = (chnagedValues: any) => {
    console.log("chnagedValues", chnagedValues);
    setSearchedData([]);
    if (chnagedValues?.flat_type === "vacant") {
      formRef.current?.setFieldsValue({ sur_code: "" });
      setDisabledForVaccant(true);
    } else {
      setDisabledForVaccant(false);
    }
  };

  return (
    <div className="mis-report-container">
      <Form
        className="mis-report-search-container"
        ref={formRef}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onValuesChange={onValueChange}
        layout="vertical"
        autoComplete="off"
      >
        <Row>
          <Col span={12}>
            <Form.Item label="Search by flats" name="flat_type">
              <Select
                options={[
                  { label: "Alloted Flats", value: "alloted" },
                  { label: "Vacant", value: "vacant" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Search Survey Code" name="sur_code">
              <Input disabled={disabledForVacant} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item label="Search Block" name="block">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Search Floor" name="floor">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Search Flat No" name="flat_no">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={4} offset={20}>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                style={{ width: "100%" }}
              >
                Search
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {searchedData?.length > 0 && (
        <div
          style={{
            padding: 20,
            background: "white",
            position: "relative",
            zIndex: 11,
          }}
        >
          <CSVLink
            style={{ position: "absolute", zIndex: 12, top: -20 }}
            data={searchedData}
          >
            <Button type="primary">Export Data</Button>
          </CSVLink>
          <Table
            columns={
              disabledForVacant
                ? vacantColumns
                : [...vacantColumns, ...allotedColumns]
            }
            dataSource={searchedData}
          />
        </div>
      )}
    </div>
  );
};

export default MisReport;
