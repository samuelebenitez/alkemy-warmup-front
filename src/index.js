import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./pages/App/App";
import CreatePost from "./pages/CreatePost";
import Details from "./pages/Details";
import Edit from "./pages/Edit";

ReactDOM.render(
  <Router>
    <Route exact path="/">
      <App />
    </Route>
    <Route exact path="/create">
      <CreatePost />
    </Route>
    <Route exact path="/details/:id">
      <Details />
    </Route>
    <Route exact path="/edit/:id">
      <Edit />
    </Route>
  </Router>,
  document.getElementById("root")
);
