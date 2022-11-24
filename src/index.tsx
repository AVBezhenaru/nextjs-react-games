import React from "react";
import ReactDOM from "react-dom/client";
import { Main } from "./components/main/main";

import { Provider } from "react-redux";
import "./index.css";
import {store} from "./store";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);


root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Main/>
        </Provider>
    </React.StrictMode>
);