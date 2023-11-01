import { Button, Form, Input, Modal, Table, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { addFlat, getFlats, updateFlat } from "../../services/flats";

interface Props {
  isModalOpen: boolean;
  selectedFlat?: any;
  setIsModalOpen: (val: boolean) => void;
  fetchFlats: () => void;
}

const AddFlat = ({
  isModalOpen,
  selectedFlat,
  setIsModalOpen,
  fetchFlats,
}: Props) => {
  const formRef = useRef<any>(null);

  const onFinish = async (values: any) => {
    try {
      const res = selectedFlat
        ? await updateFlat({ ...values, id: selectedFlat.id })
        : await addFlat(values);
      if (res?.status) {
        message.success(res?.message);
        fetchFlats();
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
    if (selectedFlat) {
      formRef.current.setFieldsValue(selectedFlat);
    }
  }, [selectedFlat]);

  return (
    <Modal
      title="Add Flat"
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
          label="Block"
          name="block"
          rules={[{ required: true, message: "Please enter the block" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Floor"
          name="floor"
          rules={[{ required: true, message: "Please enter the floor" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Flat Number"
          name="flat_no"
          rules={[{ required: true, message: "Please enter the flat number" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddFlat;
