import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NewConversation from "./newConversation";
export default class allConversations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem("id"),
      allConversations: [],
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loadConversations() {
    let token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/conversations/profil/", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        this.setState({ allConversations: res.data });
        // console.log(this.state.allConversations);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    if (window.confirm("Voulez-vous vous déconnecter ?")) {
      localStorage.clear();
      window.location.href = "/login";
    }
  }

  componentDidMount() {
    this.loadConversations();
  }

  render() {
    const { allConversations, error } = this.state;

    return (
      <div className="bg-slate-100">
        <button
          className="rounded-full p-2 m-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500"
          onClick={this.logout}
        >
          Déconnexion
        </button>
        <div className="flex flex-col items-center justify-center w-full h-screen bg-slate-100">
          <div className="flex flex-col bg-white shadow-md rounded-lg w-3/4 h-3/4">
            <NewConversation />
            <div className="flex flex-col h-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white pt-8 pl-6 pr-12 rounded-b-lg">
              <div>
                <p className="text-3xl w-3/12 rounded-full font-bold mb-8 bg-white bg-gradient-to-r from-purple-500 to-pink-500 p-2">
                  Contacts
                </p>
                <div className="italic text-red-500 mt-3">{error}</div>
                {allConversations.map((conversation) => (
                  <div className="flex items w-full mb-3" key={conversation.id}>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center w-full text-lg font-bold ml-1 border-white">
                      <Link to={`/profil/${conversation.id}`}>
                        {conversation.User.name} {conversation.User.firstname}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
