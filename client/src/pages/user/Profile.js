import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";

const Profile = () => {
  const gradient = "linear-gradient(to right, #B289D6, #A06CD5)";

  return (
    <>
      <Layout>
        <div
          className="containder-fluid m-3 p-3"
          style={{ background: gradient }}
        >
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-3">
                <h3>User Profile</h3>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
