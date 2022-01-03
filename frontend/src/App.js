import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Home from "./components/Home";
import Profil from "./components/profil";
import Conversation from "./components/conversation";
// import NewConversation from "./components//newConversation";

function App() {
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  } else {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/profil" exact component={Profil} />
          {/* <Route path="/createconversation/" exact component={NewConversation} /> */}
          <Route path="/profil/:idConv" exact component={Conversation} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
