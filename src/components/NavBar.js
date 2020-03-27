import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "react-bootstrap";
import logo from "./img/user_img.png";
import HelpIcon from "@material-ui/icons/Help";
import Sidebar from "./sidebar/Sidebar";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import "./nav.css";
let isAuth;
let username;
export default function NavBar(props) {
  const [show, setShow] = React.useState(false);
  isAuth = localStorage.getItem("loginToken");
  let user = JSON.parse(localStorage.getItem("token")) || [];
  username = user.map(usr => usr.userName);

  const showProfile = () => {
    setShow(!show);
  };
  const Logout = () => {
    localStorage.removeItem("loginToken");
    props.history.push("/");
  };
  return (
    <>
      <Navbar
        bg="light"
        variant="dark"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #000",
          borderTop: "1px solid #000",
          position: "relative"
        }}
      >
        <div>
          <Sidebar />
          <div
            style={{
              backgroundColor: "hsl(14, 90%, 62%)",
              width: 250,
              position: "absolute",
              top: "0",
              bottom: "0",
              left: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Navbar.Brand
              href="#home"
              style={{
                marginLeft: "-30px",
                display: "flex",
                alignItems: "center"
              }}
            >
              <ViewModuleIcon style={{ fontSize: "70px", marginTop: "15px" }} />
              <span style={{ paddingTop: "30px" }}> Resorce Mangement</span>
            </Navbar.Brand>
          </div>
        </div>
        <div>
          <div style={{ display: "flex" }}>
            <button
              onClick={showProfile}
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "transparent"
              }}
            >
              <img
                src={logo}
                alt="user profile"
                style={{ width: 50, height: 50, borderRadius: "50%" }}
              />
            </button>
            {show && isAuth ? (
              <div className="user-name">
                {" "}
                <div className="div">
                  <div className="user-details">
                    <h5 style={{ alignSelf: "center" }}>
                      {!isAuth ? "Not logedin" : username}
                      {console.log(username, "username")}
                    </h5>
                    <p>
                      Member Since <br />
                      May-2019
                    </p>
                  </div>
                  <button className="btn btn-light mb-3 ml-3" onClick={Logout}>
                    Profile
                  </button>
                  <button className="btn btn-light mb-3 mr-3" onClick={Logout}>
                    Logout
                  </button>
                </div>
              </div>
            ) : null}

            <span style={{ alignSelf: "center" }}>
              {!isAuth ? "Not logedin" : username}
              {console.log(username, "username")}
            </span>

            <HelpIcon
              style={{ color: "#000", width: 45, height: 45, marginLeft: 50 }}
            />
          </div>
        </div>
      </Navbar>
    </>
  );
}
