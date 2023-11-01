import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getFlats } from "../../services/flats";
import { getAdmins } from "../../services/admin";
import AddAdmin from "./AddAdmin";

const AdminList = () => {
  const [admins, setAdmins] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
    {
      title: "S.No.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const fetchAdmin = () => {
    getAdmins().then((res) => {
      if (Array.isArray(res)) {
        setAdmins([...res]);
      }
    });
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <>
      <div style={{ width: "calc(100% - 48px)", margin: "10px auto" }}>
        <Button type="primary" onClick={showModal}>
          Add Admin
        </Button>
        <Table columns={columns} dataSource={admins} pagination={false} />
      </div>
      <AddAdmin
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        fetchAdmin={fetchAdmin}
      />
    </>
  );
};

export default AdminList;
