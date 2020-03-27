import React from "react";
let isAuth;
class Formula extends React.Component {
  componentDidMount() {
    isAuth = localStorage.getItem("loginToken");
    if (isAuth) {
      console.log("Authenticated");
    } else {
      this.props.history.push("/");
      alert("Please Login to access this page");
    }
  }
  render() {
    return (
      <div style={{ color: "#000" }}>
        <h1>Formla</h1>
      </div>
    );
  }
}
export default Formula;
