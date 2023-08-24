import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <>
      <Layout>
        <div
          className="container-fluid m-3 p-3"
          style={{
            background: "linear-gradient(to right, #A06CD5, #6247AA)",
            borderRadius: "10px",
            padding: "20px",
            color: "white",
          }}
        >
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-3">
                <h2>User Details</h2>
                <h3>NAME : {auth?.user?.name}</h3>
                <h3>EMAIL : {auth?.user?.email}</h3>
                <h3>PHONE : {auth?.user?.phone}</h3>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
