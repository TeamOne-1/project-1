import React from "react";
function HOC(OriginalComponent) {
  class NewComponent extends React.Component {
    state = {
      user: {
        fullName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        errors: {
          fullName: "",
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
          dontmath: "",
          userExist: ""
        },
        show: false
      }
    };
    onCancel = () => {
      this.setState({
        user: {
          fullName: "",
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
          errors: {
            fullName: "",
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
            dontmath: "",
            userExist: ""
          }
        }
      });
    };

    handleChange = e => {
      const { user } = this.state;
      const { name, value } = e.target;
      let errors = this.state.user && this.state.user.errors;
      const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      switch (name) {
        case "fullName":
          errors.fullName =
            value.length < 5 ? "Full Name must be 5 characters long!" : "";

          break;
        case "userName":
          errors.userName =
            value.length < 3 ? "Username must be 3 characters or more!" : "";
          break;
        case "email":
          errors.email = regexp.test(value) ? "" : "Email is not valid!";
          break;
        case "password":
          errors.password =
            value.length < 8 ? "Password must be 8 characters long!" : "";
          break;
        case "confirmPassword":
          errors.confirmPassword =
            value.length < 8 ? "Password must be 8 characters long!" : "";

        default:
          break;
      }

      this.setState({ user: { ...user, [name]: value, errors } });
      console.log(errors);
    };
    render() {
      const {
        email,
        password,
        confirmPassword,
        fullName,
        userName
      } = this.state.user;
      const isEnabled =
        email.length > 0 &&
        password.length > 0 &&
        fullName.length > 0 &&
        confirmPassword.length > 0 &&
        userName.length > 0;
      const loginDis = email.length > 0 && password.length > 0;
      return (
        <OriginalComponent
          user={this.state.user}
          handleChange={this.handleChange}
          isEnabled={isEnabled}
          loginDis={loginDis}
          onCancel={this.onCancel}
          {...this.props}
        />
      );
    }
  }
  return NewComponent;
}
export default HOC;
