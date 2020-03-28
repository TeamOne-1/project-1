import React from "react";
import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Resource from "./components/resource/Resource";
import Project from "./components/Project";
import Formula from "./components/Formula";
import Login from "./components/forms/Login";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import Signup from "./components/forms/Signup";
import HOC from "./components/forms/Hoc";

function App() {
  let isLogin = JSON.parse(localStorage.getItem("token"));
  return (
    <div style={{ minHeight: "100%" }}>
      <Provider store={store}>
        <Router>
          <Route exact render={props => <NavBar {...props} />} />
          <Switch>
            <Route exact path="/" render={props => <Login {...props} />} />
            <Route
              exact
              path="/signup"
              render={props => <Signup {...props} />}
            />
            <Route
              exact
              path="/resource"
              render={props => <Resource {...props} />}
            />
            <Route
              exact
              path="/project"
              render={props => <Project {...props} />}
            />
            <Route
              exact
              path="/formula"
              render={props => <Formula {...props} />}
            />
          </Switch>
          <Route exact render={props => <HOC {...props} />} />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
