import React from "react";
const USER_URL = "http://localhost:3000/api/auth/";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  async function handleRegister(e) {
    e.preventDefault();
    const formElem = e.target;
    const newUser = {
      username: formElem.username.value,
      password: formElem.password.value,
      email: formElem.email.value,
      firstName: formElem.firstName.value,
      lastName: formElem.lastName.value,
    };
    try {
      await axios.post(USER_URL + "register", newUser);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex justify-center my-24">
      <form
        onSubmit={handleRegister}
        className="flex flex-row sm:flex-col items-center sm:gap-4 bg-blue-200 w-96 p-4 text-blue-900 border border-blue-300"
      >
        <h2 className="text-3xl">Register</h2>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex justify-between min-w-72">
            <label htmlFor="username">Username:</label>
            <input
              required
              type="text"
              name="username"
              id="username"
              className="border border-blue-200 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <div className="flex justify-between min-w-72">
            <label htmlFor="password">Password:</label>
            <input
              required
              type="password"
              name="password"
              id="password"
              className="border border-blue-200 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <div className="flex justify-between min-w-72">
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              name="email"
              id="email"
              className="border border-blue-200 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <div className="flex justify-between min-w-72">
            <label htmlFor="firstName">First Name</label>
            <input
              required
              type="text"
              name="firstName"
              id="firstName"
              className="border border-blue-200 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <div className="flex justify-between min-w-72">
            <label htmlFor="lastName">Last Name</label>
            <input
              required
              type="text"
              name="lastName"
              id="lastName"
              className="border border-blue-200 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
        </div>
        <button className="text-blue-900 transition-all duration-300 hover:bg-blue-900 hover:text-white px-4 py-2 bg-blue-100 border border-blue-200">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
