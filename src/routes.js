import React from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import api from "./utils/api";

import MainPage from "./pages/Main";
import EditorPage from "./pages/Editor";
import CreatorPage from "./pages/Creator";
import LoginPage from "./pages/Login";

export default function Routes() {
  const history = useHistory();
  const [loaded, setLoaded] = React.useState(false);
  function getToken() {
    if (loaded) return;
    let t = localStorage.getItem("authToken");
    if (t) {
      setLoaded(true);
      api.defaults.headers["Authorization"] = `Bearer ${t.toString()}`;
    } else {
      history.push("/login");
    }
  }
  React.useLayoutEffect(getToken, [history, loaded]);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/edit" component={EditorPage} />
        <Route path="/create" component={CreatorPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
}
