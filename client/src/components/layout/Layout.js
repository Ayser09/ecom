import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  const gradientColors = ["#fe8dc6,#fed1c7"];
  const gradient = `linear-gradient(to right, ${gradientColors.join(", ")})`;

  return (
    <div style={{ background: gradient }}>
      <Header />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
