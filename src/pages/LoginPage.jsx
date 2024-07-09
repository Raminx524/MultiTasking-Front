import React from "react";
import axios from "axios";
import { useUserContext } from "../contexts/auth.context";
import { formatJWTTokenToUser } from "../utils/utils";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import api from "@/services/api.service";
import { Button } from "@/components/ui/button";

function LoginPage() {
  const navigate = useNavigate();
  const { user, login } = useUserContext();
  if (user) return <Navigate to="/" />;
  async function handleLogin(e) {
    e.preventDefault();
    const formElem = e.target;
    const username = formElem.username.value;
    const password = formElem.password.value;
    try {
      const res = await api.post("/auth/login", { username, password });
      const token = res.data.token;
      localStorage.setItem("MultiTask-Token", token);
      const { userId } = formatJWTTokenToUser(token);
      const userRes = await api.get(`/auth/${userId}`, {
        headers: { Authorization: token },
      });
      login(userRes.data);
      toast({ title: `Welcome ${userRes.data.firstName}` });
      navigate("/");
    } catch (err) {
      if (err.response.status === 401)
        toast({ title: "Invalid username or password!" });
      else toast({ title: "Oops, Something went wrong!" });
    }
  }
  return (
    <div className="flex justify-center my-24">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center sm:gap-3 w-96 p-4 rounded-lg border border-blue-300"
      >
        <h2 className="text-3xl">Log In</h2>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex justify-between min-w-72">
            <label htmlFor="username">Username:</label>
            <input
              required
              type="text"
              name="username"
              id="username"
              className="border text-primary  border-blue-200 placeholder-secondary focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <div className="flex justify-between min-w-72">
            <label htmlFor="password">Password:</label>
            <input
              required
              type="password"
              name="password"
              id="password"
              className="border text-primary border-blue-200 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
        </div>
        <Button className="rounded-lg transition-all duration-300 hover:bg-blue-900 hover:text-white px-4 py-2  border">
          Login
        </Button>
        <div className="border-t-2  pt-4 w-full text-center">
          <p>
            Don't Have an account?{" "}
            <Link
              to="/register"
              className="rounded-lg font-semibold border-b border-transparent hover:border-current"
            >
              Register Here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
