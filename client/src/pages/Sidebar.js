import React, { useState } from "react";
import { Drawer, Button } from "antd";

const SideNavBar = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer
        title="Side Navigation"
        placement="left"
        onClose={onClose}
        open={visible}
      >
        {/* Your navigation menu items go here */}
        <p>Menu Item 1</p>
        <p>Menu Item 2</p>
        {/* Add more menu items as needed */}
      </Drawer>
    </div>
  );
};

export default SideNavBar;
