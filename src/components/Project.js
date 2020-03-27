import React from "react";
let isAuth;
class Project extends React.Component {
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
        <h1>Project</h1>
      </div>
    );
  }
}
export default Project;
