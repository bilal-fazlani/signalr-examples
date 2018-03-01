import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import store, {history} from "./store";
import {ConnectedRouter} from "react-router-redux";

const target = document.querySelector('#root');


render(
    <Provider store = {store}>
        <ConnectedRouter history={history}>
            <div>
                <App />
            </div>
        </ConnectedRouter>
    </Provider>,
    target
);

registerServiceWorker();
