import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "moment/locale/fr";
let moment = require("moment");

export default class conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: parseInt(localStorage.getItem("id")),
      allMessages: [],
      message: "",
      error: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loadMessages() {
    let token = localStorage.getItem("token");

    axios
      .get(
        "http://localhost:3000/api/conversations/" +
          this.props.match.params.idConv +
          "/messages",
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        this.setState({ allMessages: res.data });
      })
      .catch((error) => {
        console.log({ error });
      });
  }

  sendMessage = (e) => {
    if (e.key === "Enter") {
      let token = localStorage.getItem("token");
      axios
        .post(
          "http://localhost:3000/api/conversations/" +
            this.props.match.params.idConv +
            "/message/",
          this.state,
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then(() => {
          document.location.reload();
        })
        .catch((error) => {
          this.setState({ error: error.response.data.error });
        });
    }
  };

  deleteConversation() {
    if (window.confirm("Voulez-vous supprimer cette conversation ?")) {
      let token = localStorage.getItem("token");
      axios
        .delete(
          "http://localhost:3000/api/conversations/profil/" +
            this.props.match.params.idConv,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
        .then(() => {
          alert("La conversation a bien été supprimé !");
          window.location = "/profil";
        })
        .catch((error) => {
          console.log({ error });
        });
    }
  }

  componentDidMount() {
    this.loadMessages();
  }

  render() {
    const { allMessages, message, error } = this.state;

    return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-slate-100 shadow-lg">
        <div className="flex flex-col shadow-md rounded-lg w-3/4 h-3/4 bg-gradient-to-r from-purple-500 to-pink-500">
          <div className="flex justify-around items-center w-full h-20">
            <Link to="/profil/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <button onClick={this.deleteConversation.bind(this)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center w-full h-full text-white pt-8 pl-6 pr-12 rounded-b-lg bg-gradient-to-r from-cyan-500 to-blue-500 overflow-scroll">
            {allMessages.map((message) => (
              <div
                className="flex flex-col items-center justify-center w-2/3 mb-4 p- text-slate-600 rounded bg-white break-all"
                key={message.id}
              >
                <p className="text-lg ">{message.message}</p>
                <p className="flex justify-end w-full text-xs text-slate-500 pr-2">
                  {moment(message.createdAt).fromNow()}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center rounded-b-lg w-3/4 h-20 bg-gradient-to-r from-purple-500 to-pink-500">
          <div className="w-4/12">
            <input
              type="text"
              placeholder="Ajouter un message..."
              name="message"
              onKeyPress={this.sendMessage}
              value={message}
              onChange={this.changeHandler}
              className="flex items-center w-full text-sm text-slate-600 py-2 px-3 rounded-full outline-none"
            />
          </div>
        </div>
        <div className="italic text-red-500 mt-3">{error}</div>
      </div>
    );
  }
}
