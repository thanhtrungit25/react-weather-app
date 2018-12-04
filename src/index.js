import React from "react";
import ReactDOM from "react-dom";
import "./styles/reset.css";
import "./styles/global.css";
import Router from "./components/Router";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<Router />, document.getElementById("root"));

serviceWorker.unregister();
