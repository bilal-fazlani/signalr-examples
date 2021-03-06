import createHistory from "history/createBrowserHistory";
import {routerMiddleware} from "react-router-redux";
import rootReducer from "./reducers/rootReducer";
import {compose, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

export const history = createHistory();

const enhancers = [];

const middleware = [
    thunk,
    routerMiddleware(history)
];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

let initialState = {};

const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
);

export default store;