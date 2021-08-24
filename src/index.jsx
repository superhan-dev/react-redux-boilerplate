import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {render} from "react-dom";
import {Provider} from "react-redux";

import {store} from "./_helpers";
import {App} from "./App";
import "./index.css";

import {SnackbarProvider} from "notistack";


render(
    <SnackbarProvider maxSnack={3} hideIconVariant={false}>
        <Provider store={store}>
            <App/>
        </Provider>
    </SnackbarProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
