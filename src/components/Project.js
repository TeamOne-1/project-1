import React from "react";
import ResHoc from "./IsAuthHoc";
class Project extends React.Component {
  componentDidMount() {
    this.props.handleAuth();
  }
  render() {
    return (
      <div style={{ color: "#000" }}>
        <h1>Project</h1>
      </div>
    );
  }
}
export default ResHoc(Project);
