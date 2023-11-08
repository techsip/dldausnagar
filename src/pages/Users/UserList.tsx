import { Button, Popconfirm, Table, message, Upload, UploadProps } from "antd";
import React, { useEffect, useState } from "react";
import { getFlats } from "../../services/flats";
import { deleteUser, getUsers, truncateUsers } from "../../services/users";
import AddFlat from "../Flats/AddFlat";
import AddUser from "./AddUser";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { API_HOST } from "../../services/common";
import apiendpoins from "../../constants/apiendpoins";
import { getCookie } from "../../utils";
import { CSVLink } from "react-csv";

interface Props {
  isAdmin: boolean;
}

const UserList = ({ isAdmin }: Props) => {
  const [users, setUser] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [deleteOpen, setDeleteOpen] = useState();
  const [confirmDeleteLoading, setConfirmDeleteLoading] = useState(false);
  const [truncateUsersConfirm, setTruncateUsersConfirm] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Father Name",
      dataIndex: "father_name",
      key: "father_name",
    },
    {
      title: "Senior Citizen",
      dataIndex: "senior_citizen",
      key: "senior_citizen",
      filters: [
        { text: "Yes", value: "yes" },
        { text: "No", value: "no" },
      ],
      onFilter: (value: any, record: any) =>
        record.senior_citizen.includes(value),
    },
    {
      title: "PWD",
      dataIndex: "pwd",
      key: "pwd",
      filters: [
        { text: "Yes", value: "yes" },
        { text: "No", value: "no" },
      ],
      onFilter: (value: any, record: any) => record.pwd.includes(value),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Flat Details",
      render: (user: any) =>
        user?.flat_id && (
          <>
            <div>Block: {user.block}</div>
            <div>Floor: {user.floor}</div>
            <div>Flat: {user.flat_no}</div>
          </>
        ),
    },
    {
      title: "Action",
      render: (user: any) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => showModal(user)}
          />

          {!user?.flat_id && (
            <Popconfirm
              title={`Delete flat ${user?.name}`}
              description={`Are you sure to delete the flat ${user.name} with phone ${user.phone}`}
              open={deleteOpen === user.user_id}
              onConfirm={() => removeFlat(user?.user_id)}
              okButtonProps={{ loading: confirmDeleteLoading }}
              onCancel={() => setDeleteOpen(undefined)}
            >
              <Button
                style={{ marginLeft: 10 }}
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => setDeleteOpen(user.user_id)}
              />
            </Popconfirm>
          )}
        </>
      ),
    },
  ];

  const removeFlat = async (id: string) => {
    try {
      const res = await deleteUser(id);
      if (res?.status) {
        message.success(res?.message);
        fetchUsers();
      } else {
        message.error(res?.message);
      }
    } catch (e) {
      message.error("something went wrong");
    }
    setDeleteOpen(undefined);
    setConfirmDeleteLoading(false);
  };

  const showModal = (user: any) => {
    if (user) {
      setSelectedUser(user);
    }
    setIsModalOpen(true);
  };

  const fetchUsers = () => {
    getUsers().then((res) => {
      if (Array.isArray(res)) {
        setUser([...res]);
      }
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedUser(undefined);
    }
  }, [isModalOpen]);

  const props: UploadProps = {
    showUploadList: false,
    name: "file",
    action: `${API_HOST}${apiendpoins.uploadUsers}`,
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
    onChange(info) {
      console.log("infor", info);
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.response?.status) {
        message.success(
          info.file.response?.message ||
            `${info.file.name} file uploaded successfully`
        );
        fetchUsers();
      } else if (info.file.response?.message) {
        message.error(info.file.response?.message);
      }
    },
  };

  const confirmTruncateUsers = async () => {
    try {
      const res = await truncateUsers();
      if (res?.status) {
        message.success(res?.message);
        fetchUsers();
      } else {
        message.error(res?.message);
      }
    } catch (e) {
      message.error("something went wrong");
    }
    setTruncateUsersConfirm(false);
  };
  return (
    <>
      <div style={{ width: "calc(100% - 48px)", margin: "10px auto" }}>
        <div
          style={{
            display: "flex",
            marginBottom: 10,
          }}
        >
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          <Button type="primary" onClick={showModal} style={{ marginLeft: 10 }}>
            Add User
          </Button>
          {isAdmin && (
            <Popconfirm
              title="Delete the users"
              description="Are you sure to delete all the users?"
              onConfirm={confirmTruncateUsers}
              onCancel={() => setTruncateUsersConfirm(false)}
              open={truncateUsersConfirm}
              okText="Yes"
              cancelText="No"
            >
              <Button
                style={{ marginLeft: 10 }}
                type="primary"
                danger
                onClick={() => setTruncateUsersConfirm(true)}
              >
                Truncate Users
              </Button>
            </Popconfirm>
          )}
          <CSVLink style={{ marginLeft: 10 }} data={users}>
            <Button type="primary">Export Data</Button>
          </CSVLink>
          <div style={{ marginLeft: 10 }}>Total Users: {users?.length}</div>
        </div>
        <Table columns={columns} dataSource={users} />
      </div>
      <AddUser
        isModalOpen={isModalOpen}
        selectedUser={selectedUser}
        setIsModalOpen={setIsModalOpen}
        fetchUsers={fetchUsers}
      />
    </>
  );
};

export default UserList;
