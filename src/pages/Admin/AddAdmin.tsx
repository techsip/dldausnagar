import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { addFlat, getFlats } from "../../services/flats";
import { addAdmin } from "../../services/admin";
import Password from "antd/es/input/Password";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
  fetchAdmin: () => void;
}
const AddAdmin = ({ isModalOpen, setIsModalOpen, fetchAdmin }: Props) => {
  const formRef = useRef<any>(null);

  const onFinish = async (values: any) => {
    try {
      const res = await addAdmin(values);
      if (res?.status) {
        message.success(res?.message);
        fetchAdmin();
        handleCancel();
      } else message.error(res?.message);
    } catch (e) {
      message.error("something went wrong");
    }
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    onReset();
  };

  const handleOk = () => {
    formRef.current.submit();
  };

  return (
    <Modal
      title="Add Admin"
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Form
        ref={formRef}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 800 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the admin name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter the password" }]}
        >
          <Password />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter the email" }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please enter the phone" }]}
        >
          <Input type="tel" />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select the role" }]}
        >
          <Select
            options={[
              { value: "admin", label: "Admin" },
              { value: "operator", label: "Operator" },
            ]}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          {/* <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button> */}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAdmin;
