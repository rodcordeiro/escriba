import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

import Header from "../../components/Header";

import api from "../../utils/api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    let userObj = {
      username,
      password,
    };

    await api
      .post("/v1/auth/login", userObj)
      .then((response) => {
        localStorage.setItem("authToken", response.data.accessToken);
        api.defaults.headers[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function goToMainPage() {
    navigate("/edit");
  }

  return (
    <div className="loginContainer">
      <Header page="main" action={goToMainPage} className="header" />
      <form
        method="post"
        onSubmit={(e) => handleLogin(e)}
        className="formContainer"
      >
        <input
          type="text"
          name="username"
          placeholder="Type your username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Type your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
