import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

export const UrlContext = React.createContext("http://localhost:8080");

ReactDOM.render(
  <React.StrictMode>
    <UrlContext.Provider
      value={process.env.REACT_APP_BASEURL || "http://localhost:8080"}
    >
      <App />
    </UrlContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
