import React from "react";
import ReactDOM from "react-dom/client";

import Chess from "./components/chess/Chess";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
import './styles/globals.scss'

root.render(
  <Chess />
);
