import React, { Component } from "react";
import axios from "axios";

export default class newConversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem("id"),
      email: "",
      error: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addConversation(e) {
    if (e.key === "Enter") {
      // let token = localStorage.getItem("token");
      // axios
      //   .post("http://localhost:3000/api/conversations/", this.state, {
      //     // headers: {
      //     //   Authorization: "Bearer " + token,
      //     // },
      //   })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((error) => {
      //     this.setState({ error: JSON.stringify(error) });
      //     console.log(JSON.stringify(error));
      //   });
      axios
        .post(
          "http://localhost:3000/api/conversations/",
          {
            email: this.state.email,
          },
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    }
  }

  render() {
    const { email, error } = this.state;

    return (
      <div>
        <div className="flex items-center justify-center rounded-t-lg h-20 bg-gradient-to-r from-purple-500 to-pink-500">
          <div className="flex items-center justify-center w-4/12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            <input
              type="text"
              placeholder="Ajouter un email..."
              name="email"
              onKeyPress={this.addConversation.bind(this)}
              value={email}
              onChange={this.changeHandler}
              className="flex items-center w-full text-sm text-slate-600 py-2 px-3 rounded-full outline-none"
            />
          </div>
          <div className="italic text-white mt-3">{error}</div>
        </div>
      </div>
    );
  }
}
