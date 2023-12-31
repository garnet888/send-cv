import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAdminContext } from "./context/AdminContext";
import { useAuthContext } from "./context/AuthContext";
import Layout from "./utils/Layout/Layout";
import Admin from "./admin/pages/Admin";
import AdminLogin from "./admin/pages/AdminLogin";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import MyCV from "./pages/Profile/MyCV";
import SentCV from "./pages/Profile/SentCV";
import Personalinfo from "./pages/Profile/Personalinfo";
import ChangePassword from "./pages/Profile/ChangePassword";
import JobList from "./pages/JobList";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";

function App() {
  const { isLogin: isAdminAuth } = useAdminContext();
  const { isLogin } = useAuthContext();

  return (
    <Routes>
      <Route
        path="/admin/*"
        element={isAdminAuth ? <Admin /> : <AdminLogin />}
      />

      <Route
        path="/"
        element={
          <Layout>
            <JobList />
          </Layout>
        }
      />
      <Route
        path="/detail/:id"
        element={
          <Layout>
            <Detail />
          </Layout>
        }
      />

      {isLogin ? (
        <>
          <Route
            path="/my-cv"
            element={
              <Layout>
                <MyCV />
              </Layout>
            }
          />
          <Route
            path="/sent-cv"
            element={
              <Layout>
                <SentCV />
              </Layout>
            }
          />
          <Route
            path="/personal-info"
            element={
              <Layout>
                <Personalinfo />
              </Layout>
            }
          />
          <Route
            path="/change-password"
            element={
              <Layout>
                <ChangePassword />
              </Layout>
            }
          />
        </>
      ) : (
        <>
          <Route
            path="/signup"
            element={
              <Layout>
                <Signup />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
        </>
      )}

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
