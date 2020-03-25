import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Resource from "./components/Resource";
import Project from "./components/Project";
import Formula from "./components/Formula";
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route
            exact
            path="/resource"
            render={props => <Resource {...props} />}
          />
          <Route path="/project" render={props => <Project {...props} />} />
          <Route path="/formula" render={props => <Formula {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
