import "./Layout.css";

import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
export default function Layout() {
  return (
    <main>
      <Header />
      <div style={{ flex: 1, width: "100%" }}>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
