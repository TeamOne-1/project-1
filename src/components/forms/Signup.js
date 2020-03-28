import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import HOC from "./Hoc";
import { connect } from "react-redux";
import { signup } from "../redux/actions/signup";
const SignUp = props => {
  const [show, setShow] = useState(true);

  const onShow = () => {
    setShow(!setShow);
  };
  const onSubmit = e => {
    e.preventDefault();
    props.signup(props);
  };
  const backToLogIn = () => {
    props.history.push("/");
    // console.log(props.fail, "000000");
  };
  const {
    userName,
    fullName,
    email,
    password,
    confirmPassword,
    userExist
  } = props.user.errors;

  return (
    <div
      style={{
        width: "35%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center"
      }}
    >
      {props.error ? (
        <div className="alert alert-danger" role="alert">
          {props.error}
        </div>
      ) : null}
      <h1
        style={{ color: "hsl(14, 90%, 61%)", fontWeight: "bold" }}
        className="h1 pb-5"
      >
        Singup
      </h1>
      <Form onSubmit={onSubmit}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label className="float-left">Full Name</Form.Label>
            <Form.Control
              value={props.user.fullName}
              onChange={props.handleChange}
              name="fullName"
              type="text"
              placeholder="Enter Your Full Name"
              className={fullName ? "is-invalid" : ""}
              required
            />
            <span className="error">{fullName}</span>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label className="float-left">Username</Form.Label>
            <Form.Control
              value={props.user.userName}
              onChange={props.handleChange}
              name="userName"
              type="text"
              placeholder="Enter Your user name"
              className={userName ? "is-invalid" : ""}
              required
            />
            <span className="error">{userName}</span>
          </Form.Group>
        </Form.Row>

        <Form.Group>
          <Form.Label className="float-left">Email</Form.Label>
          <Form.Control
            value={props.user.email}
            onChange={props.handleChange}
            name="email"
            type="email"
            placeholder="Enter Your Email"
            className={email ? "is-invalid" : ""}
            required
          />
          <span className="error">{email}</span>
        </Form.Group>

        <Form.Group style={{ position: "relative" }}>
          <Form.Label className="float-left">Password</Form.Label>
          <Form.Control
            value={props.user.password}
            onChange={props.handleChange}
            name="password"
            // type="password"
            type={show ? "password" : "text"}
            placeholder="Enter your Password"
            className={password ? "is-invalid" : ""}
            required
          />
          {show ? (
            <VisibilityOffIcon
              onClick={onShow}
              style={{ position: "absolute", top: "57%", right: "3%" }}
            />
          ) : (
            <VisibilityIcon
              onClick={onShow}
              style={{ position: "absolute", top: "57%", right: "3%" }}
            />
          )}
        </Form.Group>
        <span className="text-danger">{password}</span>
        <Form.Group style={{ position: "relative" }}>
          <Form.Label className="float-left">Confirm Password</Form.Label>
          <Form.Control
            value={props.user.confirmPassword}
            onChange={props.handleChange}
            name="confirmPassword"
            type={show ? "password" : "text"}
            // type="password"
            placeholder="Re-Enter your Password"
            className={confirmPassword ? "is-invalid" : ""}
            required
          />
          {show ? (
            <VisibilityOffIcon
              onClick={onShow}
              style={{ position: "absolute", top: "57%", right: "3%" }}
            />
          ) : (
            <VisibilityIcon
              onClick={onShow}
              style={{ position: "absolute", top: "57%", right: "3%" }}
            />
          )}
        </Form.Group>
        <span className="error">{confirmPassword}</span>
        <Button
          style={{
            backgroundColor: "hsl(14, 90%, 61%)",
            border: "1px solid hsl(14, 90%, 61%)"
          }}
          className="btn btn-block text-white btn-color"
          type="submit"
          disabled={!props.isEnabled}
        >
          {/* {props.loading && <i className="fa fa-refresh fa-spin mr-2"></i>}

          {props.loading && <span>Signing up</span>}
          {!props.loading && <span>Signup</span>} */}
          Signup
        </Button>
      </Form>
      <div className="d-flex justify-content-between mt-5 align-items-center">
        <h6 className="mt-4">Already have an account?</h6>
        <button onClick={backToLogIn} className="text-white btn-color btn">
          Login
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  console.log("state", state);
  return {
    error: state.signup.error,
    signup: state.signup,
    success: state.signup.success,
    loading: state.signup.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: values => dispatch(signup(values))
  };
};
const SignupComp = HOC(SignUp);

export default connect(mapStateToProps, mapDispatchToProps)(SignupComp);
