import React from "react";
import { Link } from "react-router-dom";
import { Component } from "react";
import axios from "axios";

class register extends Component {
  state = {
    email: "",
    name: "",
    firstname: "",
    password: "",
    error: "",
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/auth/signup", this.state)
      .then((res) => {
        console.log(res);
        window.location.href = "/login";
      })
      .catch((error) => {
        this.setState({ error: error.response.data.error });
        console.log(error.response.data);
      });
  };

  render() {
    const { email, name, firstname, password, error } = this.state;
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
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              placeholder="Nom"
              value={name}
              onChange={this.changeHandler}
            ></input>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstname"
              name="firstname"
              placeholder="Prénom"
              value={firstname}
              onChange={this.changeHandler}
            ></input>
          </div>
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
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-2 px-4 rounded mt-8"
          >
            Inscription
          </button>
          <div className="italic text-red-500 mt-3">{error}</div>
        </form>
        <div className="mt-8 text-center text-gray-500 text-xs">
          <div className="flex">
            Vous avez déjà un compte ?
            <Link to="/login">
              <p className="text-blue-500 ml-1">Je me connecte</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default register;
