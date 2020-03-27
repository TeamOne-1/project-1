import React from "react";
import ResourceTable from "./ResourceTable";
let isAuth;
class Resource extends React.Component {
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
      <div>
        <ResourceTable />
      </div>
    );
  }
}
export default Resource;
