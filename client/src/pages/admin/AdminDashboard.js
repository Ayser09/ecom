import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <>
      <Layout>
        <div className="m-3 p-3 container-fluid">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <div className="">
                <h2>Admin name : {auth?.user?.name} </h2>
                <h2>Admin email: {auth?.user?.email} </h2>
                <h2>Admin phone: {auth?.user?.phone} </h2>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AdminDashboard;
