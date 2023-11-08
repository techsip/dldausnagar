import {
  Button,
  Form,
  Modal,
  Popconfirm,
  Select,
  Table,
  Tag,
  message,
  Upload,
  UploadProps,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  assignFlatToUser,
  deleteFlat,
  getFlats,
  randomFlatAssignment,
  removeAllotmentFlat,
  truncateFlats,
} from "../../services/flats";
import AddFlat from "./AddFlat";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { getUsers } from "../../services/users";
import { API_HOST } from "../../services/common";
import apiendpoins from "../../constants/apiendpoins";
import { getCookie } from "../../utils";
import { CSVLink } from "react-csv";

interface Props {
  isAdmin: boolean;
}
const FlatList = ({ isAdmin }: Props) => {
  const [flats, setFlats] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlat, setSelectedFlat] = useState();
  const [deleteOpen, setDeleteOpen] = useState();
  const [cancelAllotmentOpen, setCancelAllotmentOpen] = useState();
  const [confirmDeleteLoading, setConfirmDeleteLoading] = useState(false);
  const [assignModal, setAssignModal] = useState(false);
  const [allUsers, setAllUsers] = useState<any>([]);
  const [truncateFlatConfirm, setTruncateFlatsConfirm] = useState(false);

  const onFilter = (inputValue: any, record: any) => {
    const a =
      inputValue?.toLowerCase().startsWith(record?.username?.toLowerCase()) ||
      inputValue?.toLowerCase().startsWith(record?.aadhar?.toLowerCase()) ||
      inputValue?.toLowerCase().startsWith(record?.phone?.toLowerCase());
    if (a) console.log("aaaaa", inputValue, record, a);
    return a;
  };

  const cancelAllotment = async (flat_id: any) => {
    console.log("flat", flat_id);
    try {
      const res = await removeAllotmentFlat(flat_id);
      if (res?.status) {
        message.success(res?.message);
        fetchFlats();
      } else {
        message.error(res?.message);
      }
    } catch (e) {
      message.error("something went wrong");
    }
    setCancelAllotmentOpen(undefined);
  };

  const columns = [
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
    {
      title: "User Details",
      render: (flat: any) =>
        flat?.user_id ? (
          <Tag color="green">
            <div>Name: {flat.name}</div>
            <div>Phone: {flat.phone}</div>
            <div>Father Name: {flat.father_name}</div>
            <div>Aadhar: {flat.aadhar}</div>
            <div>Gender: {flat.gender}</div>
          </Tag>
        ) : (
          <Tag color="magenta">Vacant Flat</Tag>
        ),
    },
    {
      title: "Action",
      render: (flat: any) =>
        !flat?.user_id ? (
          <>
            {/* <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => showModal(flat)}
            />

            <Popconfirm
              title={`Delete flat ${flat?.flat_no}`}
              description={`Are you sure to delete the flat ${flat.flat_no} on floor ${flat.floor} in block ${flat.block}`}
              open={deleteOpen === flat.flat_id}
              onConfirm={() => removeFlat(flat?.flat_id)}
              okButtonProps={{ loading: confirmDeleteLoading }}
              onCancel={() => setDeleteOpen(undefined)}
            >
              <Button
                style={{ marginLeft: 10 }}
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => setDeleteOpen(flat.flat_id)}
              />
            </Popconfirm> */}
          </>
        ) : (
          // <Form
          //   onFinish={(values: any) =>
          //     onUserSubmit(values?.user_id, flat?.flat_id)
          //   }
          //   style={{ width: 300 }}
          // >
          //   <Form.Item
          //     name="user_id"
          //     rules={[{ required: true }]}
          //     style={{ marginBottom: 10 }}
          //   >
          //     <Select
          //       placeholder="Select User"
          //       allowClear
          //       showSearch
          //       filterOption={onFilter}
          //     >
          //       {allUsers?.map((user: any) => (
          //         <Select.Option
          //           value={user.user_id}
          //           username={user.name}
          //           aadhar={user.aadhar}
          //           phone={user.phone}
          //         >
          //           {user?.name} (Aadhar: {user?.aadhar})
          //         </Select.Option>
          //       ))}
          //     </Select>
          //   </Form.Item>
          //   <Form.Item style={{ marginBottom: 10 }}>
          //     <Button type="primary" htmlType="submit">
          //       Submit
          //     </Button>
          //   </Form.Item>
          // </Form>
          <Popconfirm
            title={`Cancel the allotment of flat ${flat?.flat_no}`}
            description={`Are you sure to delete the flat ${flat.flat_no} on floor ${flat.floor} in block ${flat.block}`}
            open={cancelAllotmentOpen === flat.flat_id}
            onConfirm={() => cancelAllotment(flat?.flat_id)}
            okButtonProps={{ loading: confirmDeleteLoading }}
            onCancel={() => setCancelAllotmentOpen(undefined)}
          >
            <Button
              style={{ marginLeft: 10 }}
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => setCancelAllotmentOpen(flat?.flat_id)}
            />
          </Popconfirm>
        ),
    },
  ];

  const onUserSubmit = async (user_id: string, flat_id: string) => {
    try {
      const res = await assignFlatToUser({ user_id, flat_id });
      if (res?.status) {
        message.success(res?.message);
        fetchFlats();
      } else {
        message.error(res?.message);
      }
    } catch (e) {
      message.error("something went wrong");
    }
  };

  const removeFlat = async (id: string) => {
    try {
      const res = await deleteFlat(id);
      if (res?.status) {
        message.success(res?.message);
        fetchFlats();
      } else {
        message.error(res?.message);
      }
    } catch (e) {
      message.error("something went wrong");
    }
    setDeleteOpen(undefined);
    setConfirmDeleteLoading(false);
  };

  const showModal = (flat: any) => {
    if (flat) {
      setSelectedFlat(flat);
    }
    setIsModalOpen(true);
  };

  const fetchFlats = () => {
    getFlats().then((res) => {
      if (Array.isArray(res)) {
        setFlats([...res]);
      }
    });
  };

  const assignFlatToRandomUsers = async () => {
    try {
      const res = await randomFlatAssignment();
      if (res?.status) {
        message.success(res?.message);
        setAssignModal(false);
        fetchFlats();
      } else {
        message.error(res?.message);
        setAssignModal(false);
      }
    } catch (e) {
      message.error("Something went wrong");
    }
  };

  const fetchUsers = () => {
    getUsers().then((res) => {
      if (Array.isArray(res)) {
        setAllUsers([...res]);
      }
    });
  };

  useEffect(() => {
    fetchFlats();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedFlat(undefined);
    }
  }, [isModalOpen]);

  const props: UploadProps = {
    name: "file",
    action: `${API_HOST}${apiendpoins.uploadFlats}`,
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        fetchFlats();
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const sortByUser = () => {
    return flats;
    const assignedFlats = flats.filter((flat: any) => flat?.user_id);
    const unAssignedFlats = flats.filter((flat: any) => !flat?.user_id);
    return [...assignedFlats, ...unAssignedFlats];
  };

  const confirmTruncateFlats = async () => {
    try {
      const res = await truncateFlats();
      if (res?.status) {
        message.success(res?.message);
        fetchFlats();
      } else {
        message.error(res?.message);
      }
    } catch (e) {
      message.error("something went wrong");
    }
    setTruncateFlatsConfirm(false);
  };

  return (
    <>
      <div
        style={{
          width: "calc(100% - 48px)",
          margin: "10px auto",
        }}
      >
        <div
          style={{
            display: "flex",
            marginBottom: 10,
          }}
        >
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          <Button type="primary" style={{ marginLeft: 10 }} onClick={showModal}>
            Add Flat
          </Button>
          {isAdmin && (
            <Button
              style={{ marginLeft: 10 }}
              type="primary"
              ghost
              onClick={() => setAssignModal(true)}
            >
              Assign Flat to Users
            </Button>
          )}
          {isAdmin && (
            <Popconfirm
              title="Delete the flats"
              description="Are you sure to delete all the flats?"
              onConfirm={confirmTruncateFlats}
              onCancel={() => setTruncateFlatsConfirm(false)}
              open={truncateFlatConfirm}
              okText="Yes"
              cancelText="No"
            >
              <Button
                style={{ marginLeft: 10 }}
                type="primary"
                danger
                onClick={() => setTruncateFlatsConfirm(true)}
              >
                Truncate Flats
              </Button>
            </Popconfirm>
          )}
          <CSVLink style={{ marginLeft: 10 }} data={flats}>
            <Button type="primary">Export Data</Button>
          </CSVLink>
          <div style={{ marginLeft: 10 }}>Total Flats: {flats?.length}</div>
        </div>
        <Table columns={columns} dataSource={sortByUser()} />
      </div>
      <AddFlat
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        fetchFlats={fetchFlats}
        selectedFlat={selectedFlat}
      />
      <Modal
        open={assignModal}
        title="Assign Flat to Users"
        onOk={assignFlatToRandomUsers}
        onCancel={() => setAssignModal(false)}
      >
        <p>Are you sure to assign random flats to random users</p>
      </Modal>
    </>
  );
};

export default FlatList;
