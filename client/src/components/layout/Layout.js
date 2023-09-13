import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  const gradientColors = ["#E2CFEA", "#6247AA"];
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
