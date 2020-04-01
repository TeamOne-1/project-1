import React from "react";
function ResHoc(OrginalCompo) {
  let isAuth;
  class newCompo extends React.Component {
    state = {
      error: ""
    };
    handleAuth = () => {
      isAuth = localStorage.getItem("loginToken");
      if (isAuth) {
        console.log("Authenticated");
      } else {
        this.props.history.push("/");
        this.setState({
          error: "Please Login to access this page"
        });
        alert("Please Login to access this page");
      }
    };

    render() {
      return <OrginalCompo handleAuth={this.handleAuth} />;
    }
  }
  return newCompo;
}
export default ResHoc;
