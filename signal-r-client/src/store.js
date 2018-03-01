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

let index = 0;
initialState.employees = [
    {id: ++index, name: 'bilal', age: 28},
    {id: ++index, name: 'rahul', age: 30},
    {id: ++index, name: 'jay', age: 25},
    {id: ++index, name: 'amar', age: 20},
    {id: ++index, name: 'raj', age: 30},
    {id: ++index, name: 'vikas', age: 24}
];

console.info(initialState);

const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
);

export default store;