import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { addUser, updateUser } from "../../services/users";

interface Props {
  isModalOpen: boolean;
  selectedUser?: any;
  setIsModalOpen: (val: boolean) => void;
  fetchUsers: () => void;
}

const AddUser = ({
  isModalOpen,
  selectedUser,
  setIsModalOpen,
  fetchUsers,
}: Props) => {
  const formRef = useRef<any>(null);

  const onFinish = async (values: any) => {
    try {
      const res = selectedUser
        ? await updateUser({ ...values, id: selectedUser.id })
        : await addUser(values);
      if (res?.status) {
        message.success(res?.message);
        fetchUsers();
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

  useEffect(() => {
    if (selectedUser) {
      console.log("selectedUser", selectedUser);
      formRef.current.setFieldsValue(selectedUser);
    }
  }, [selectedUser]);

  return (
    <Modal
      title="Add User"
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
          rules={[{ required: true, message: "Please enter the name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please enter the phone" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Father Number"
          name="father_name"
          rules={[{ required: true, message: "Please enter the father name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please enter the age" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select the gender" }]}
        >
          <Select
            options={[
              { value: "Male", label: "male" },
              { value: "Female", label: "female" },
              { value: "Other", label: "other" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter the email" }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Aadhar"
          name="aadhar"
          rules={[{ required: true, message: "Please enter the aadhar" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Sur Code" name="sur_code">
          <Input />
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Input />
        </Form.Item>
        <Form.Item label="Religion" name="religion">
          <Input />
        </Form.Item>
        <Form.Item
          label="Senior Citizen"
          name="senior_citizen"
          rules={[
            { required: true, message: "Please select the Senior Citizen" },
          ]}
        >
          <Select
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="PWD"
          name="pwd"
          rules={[{ required: true, message: "Please select the PWD" }]}
        >
          <Select
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        </Form.Item>
        <Form.Item label="Income" name="income">
          <Input type={"number"} />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter the address" }]}
        >
          <TextArea allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUser;
