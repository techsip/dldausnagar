import React, { useEffect, useState } from "react";
import { Button, ConfigProvider, Space } from "antd";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import { getCookie } from "./utils";
import { checkAuthorisation } from "./services/auth";
import Home from "./pages/Home";
import SideMenu from "./components/SideMenu";
import FlatList from "./pages/Flats/FlatList";
import Header from "./components/Header";
import AddFlat from "./pages/Flats/AddFlat";
import UserList from "./pages/Users/UserList";
import AddUser from "./pages/Users/AddUser";
import AdminList from "./pages/Admin/AdminList";
import AddAdmin from "./pages/Admin/AddAdmin";
import MisReport from "./pages/MisReport";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [selectedTool, setSelectedtool] = useState<string>("Dashboard");
  const isAdmin = getCookie("role") === "admin";
  const navigate = useNavigate();

  const checkAuth: any = async (loggedIn?: boolean) => {
    console.log("cccc");
    if (loggedIn) setLoggedIn(loggedIn);
    else {
      const res = await checkAuthorisation();
      const logged = res?.message === "Authorised";
      setLoggedIn(logged);
      if (!logged) navigate("/");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#1b6614",
        },
      }}
    >
      <main>
        <div className="main-container">
          {loggedIn && (
            <SideMenu setSelectedtool={setSelectedtool} isAdmin={isAdmin} />
          )}
          <div className="content-container">
            <div className="dashboard-bg-img">
              <div className="dashboard-bg-img-overlay"></div>
            </div>
            {loggedIn && (
              <Header heading={selectedTool} checkAuth={checkAuth} />
            )}
            <Routes>
              {loggedIn && (
                <>
                  <Route
                    path="/flats"
                    element={<FlatList isAdmin={isAdmin} />}
                  />
                  <Route
                    path="/users"
                    element={<UserList isAdmin={isAdmin} />}
                  />
                  {isAdmin && <Route path="/admins" element={<AdminList />} />}
                  {isAdmin && (
                    <Route path="/mis-report" element={<MisReport />} />
                  )}
                </>
              )}
              <Route
                path="/"
                element={
                  loggedIn ? (
                    <Home />
                  ) : loggedIn === false ? (
                    <Login checkAuth={checkAuth} />
                  ) : null
                }
              >
                {/* <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
              </Route>
            </Routes>
          </div>
        </div>
      </main>
    </ConfigProvider>
  );
}

export default App;
