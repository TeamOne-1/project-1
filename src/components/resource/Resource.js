import React from "react";
import ResourceTable from "./ResourceTable";
import ResHoc from "../IsAuthHoc";
class Resource extends React.Component {
  componentDidMount() {
    this.props.handleAuth();
  }
  render() {
    return (
      <div>
        <ResourceTable />
      </div>
    );
  }
}
export default ResHoc(Resource);
