import React from "react";

import AdminMenu from "../../components/layout/AdminMenu";

const Users = () => {
  return (
    <>
      <div className="row">
        <div className="='col-md-3">
          <AdminMenu />
        </div>
      </div>
      <div className="='col-md-9">all users</div>
    </>
  );
};

export default Users;
