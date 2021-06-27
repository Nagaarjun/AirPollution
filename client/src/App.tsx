import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { DashBoard } from "./components/dashboard";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={DashBoard} />
    </Switch>
  </BrowserRouter>
);

export default App;
