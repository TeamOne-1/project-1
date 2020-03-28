import React from "react";
import ResHoc from "./IsAuthHoc";
class Formula extends React.Component {
  componentDidMount() {
    this.props.handleAuth();
  }
  render() {
    return (
      <div style={{ color: "#000" }}>
        <h1>Formla</h1>
      </div>
    );
  }
}
export default ResHoc(Formula);
