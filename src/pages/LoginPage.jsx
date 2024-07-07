import React from "react";
import axios from "axios";
import { useUserContext } from "../contexts/auth.context";
import { formatJWTTokenToUser } from "../utils/utils";
import { useNavigate } from "react-router-dom";
const AUTH_URL = "http://localhost:3000/api/auth/";

function LoginPage() {
  const navigate = useNavigate();
  const user = useUserContext();
  async function handleLogin(e) {
    e.preventDefault();
    const formElem = e.target;
    const username = formElem.username.value;
    const password = formElem.password.value;
    const res = await axios.post(AUTH_URL + "login", { username, password });
    const token = res.data.token;
    localStorage.setItem("token", token);
    const { userId } = formatJWTTokenToUser(token);
    const userRes = await axios.get(AUTH_URL + userId, {
      headers: { Authorization: token },
    });
    user.login(userRes.data);

    navigate("/");
  }
  return (
    <div className="flex justify-center my-24">
      <form
        onSubmit={handleLogin}
        className="flex flex-row sm:flex-col items-center sm:gap-3 bg-blue-200 w-96 p-4 text-blue-900 border border-blue-300"
      >
        <h2 className="text-3xl">Log In</h2>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex justify-between min-w-72">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              className="border border-blue-200 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <div className="flex justify-between min-w-72">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              className="border border-blue-200 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
        </div>
        <button className="text-blue-900 transition-all duration-300 hover:bg-blue-900 hover:text-white px-4 py-2 bg-blue-100 border border-blue-200">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
