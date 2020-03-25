import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "react-bootstrap";
import logo from "./img/user_img.png";
import HelpIcon from "@material-ui/icons/Help";
import Sidebar from "./sidebar/Sidebar";
export default function NavBar() {
  return (
    <>
      <Navbar
        bg="light"
        variant="dark"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #000"
        }}
      >
        <div>
          <Sidebar />
          <Navbar.Brand
            href="#home"
            style={{
              backgroundColor: "orange",
              padding: "10px 10px",
              margin: "0"
            }}
          >
            Resource Mangement
          </Navbar.Brand>
        </div>
        <div>
          <img
            src={logo}
            alt="user profile"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
          <HelpIcon
            style={{ color: "#000", width: 45, height: 45, marginLeft: 50 }}
          />
        </div>
      </Navbar>
    </>
  );
}
