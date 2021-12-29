import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

// const MySwal = withReactContent(Swal);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// // Add a 401 response interceptor
// window.axios.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     if (401 === error.response.status) {
//       MySwal.fire(
//         {
//           title: "Session Expired",
//           text: "Your session has expired. Would you like to be redirected to the login page?",
//           type: "warning",
//           showCancelButton: true,
//           confirmButtonColor: "#DD6B55",
//           confirmButtonText: "Yes",
//           closeOnConfirm: false,
//         },
//         function () {
//           window.location = "/login";
//         }
//       );
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
