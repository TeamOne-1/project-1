import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import HOC from "./Hoc";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signIn } from "../redux/actions/auth";
import "./form.css";
const Login = props => {
  const [showpass, setShowpass] = useState(true);

  const onShow = () => {
    setShowpass(!showpass);
  };
  let history = useHistory();

  const onSubmit = e => {
    e.preventDefault();
    props.signIn(props);
    console.log(props);
  };
  const goToSignup = () => {
    history.push("/signup");
  };

  return (
    <div>
      <div
        style={{
          width: "20%",
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
          className="h1"
        >
          Login
        </h1>
        <Form onSubmit={onSubmit} style={{ marginTop: "50px" }} noValidate>
          <Form.Group style={{ position: "relative" }}>
            <Form.Label className="float-left font-weight-bold">
              Username
            </Form.Label>
            <Form.Control
              name="email"
              value={props.user.email}
              onChange={props.handleChange}
              type="email"
              placeholder="Enter email"
              required
              // className={props.user.email ? "is-invalid" : ""}
            />
            {/* <span className="text-danger">{props.user.email}</span> */}
          </Form.Group>

          <Form.Group style={{ position: "relative" }}>
            <Form.Label className="float-left font-weight-bold mt-2 ">
              Password
            </Form.Label>
            <Form.Control
              name="password"
              value={props.user.password}
              onChange={props.handleChange}
              //   type="password"
              type={showpass ? "password" : "text"}
              placeholder="Password"
              required
            />
            {showpass ? (
              <VisibilityOffIcon
                onClick={onShow}
                style={{ position: "absolute", top: "59%", right: "3%" }}
              />
            ) : (
              <VisibilityIcon
                onClick={onShow}
                style={{ position: "absolute", top: "59%", right: "3%" }}
              />
            )}
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox" />

          <Button
            style={{
              backgroundColor: "hsl(14, 90%, 61%)",
              border: "1px solid hsl(14, 90%, 61%)"
            }}
            className="btn btn-block text-white btn-color"
            type="submit"
            disabled={!props.loginDis}
          >
            {/* {props.loading && <i className="fa fa-refresh fa-spin mr-2"></i>}
            {props.loading && <span>Logingin</span>}
            {!props.loading && <span>Login</span>} */}
            Login
          </Button>
          <Form.Group className="float-left">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
        </Form>
        {!props.loginDis ? (
          <button
            onClick={goToSignup}
            style={{
              position: "absolute",
              top: "100%",
              left: "0%"
            }}
            className="btn btn-color text-white"
          >
            Sign up
          </button>
        ) : (
          <button
            onClick={props.onCancel}
            style={{
              position: "absolute",
              top: "100%",
              left: "0%"
            }}
            className="btn btn-color text-white"
          >
            cancel
          </button>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  // console.log("state", state);
  return {
    error: state.signIn.error,
    signIn: state.signIn,
    success: state.signIn.success,
    loading: state.signIn.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: values => dispatch(signIn(values))
  };
};
const LoginComp = HOC(Login);
export default connect(mapStateToProps, mapDispatchToProps)(LoginComp);
