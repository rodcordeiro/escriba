import React from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import api from "./utils/api";

import MainPage from "./pages/Main";
import EditorPage from "./pages/Editor";
import CreatorPage from "./pages/Creator";
import LoginPage from "./pages/Login";

export default function Navigation() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = React.useState(false);
  function getToken() {
    if (loaded) return;
    let t = localStorage.getItem("authToken");
    if (t) {
      setLoaded(true);
      api.defaults.headers["Authorization"] = `Bearer ${t.toString()}`;
    } else {
      navigate("/login");
    }
  }
  React.useLayoutEffect(getToken, [loaded]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact component={MainPage} />
        <Route path="/edit" component={EditorPage} />
        <Route path="/create" component={CreatorPage} />
        <Route path="/login" component={LoginPage} />
      </Routes>
    </BrowserRouter>
  );
}
