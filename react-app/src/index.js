import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider, Modal } from "./context/Modal";

const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        <ModalProvider>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                    <Modal />
                </BrowserRouter>
            </Provider>
        </ModalProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
