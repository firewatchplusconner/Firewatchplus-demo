import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider, Modal } from "./context/Modal";
import { PhotoModalProvider, PhotoModal } from "./context/PhotoModal";

const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        <ModalProvider>
            <PhotoModalProvider>
                <Provider store={store}>
                    <BrowserRouter>
                        <App />
                        <Modal />
                        <PhotoModal />
                    </BrowserRouter>
                </Provider>
            </PhotoModalProvider>
        </ModalProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
