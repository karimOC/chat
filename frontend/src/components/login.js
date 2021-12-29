import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/auth/login", this.state)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.userId);
        window.location.href = "/profil";
      })
      .catch((error) => {
        this.setState({ error: error.response.data.error });
        console.log(error.response.data);
      });
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-slate-100">
        <form
          onSubmit={this.submitHandler}
          className="flex flex-col items-center justify-center bg-white shadow-md rounded p-12"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-8 text-yellow-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
          </svg>
          <div className="mb-3">
            <input
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.changeHandler}
            ></input>
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              placeholder="Mot de passe"
              value={password}
              onChange={this.changeHandler}
            ></input>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-8"
          >
            Connection
          </button>
          <div className="italic text-red-500 mt-3">{error}</div>
        </form>
        <div className="mt-8 text-center text-gray-500 text-xs">
          <div className="flex">
            Vous n’avez pas de compte ?
            <Link to="/register">
              <p className="text-blue-500 ml-1">Je m'inscris !</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default login;
