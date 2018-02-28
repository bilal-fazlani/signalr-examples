import createHistory from "history/createBrowserHistory";
import {routerMiddleware} from "react-router-redux";
import thunk from "redux-thunk/index";
import {applyMiddleware} from "redux/index";
import rootReducer from "./reducers/rootReducer";

export const history = createHistory();

const initialState = {};
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

const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
);

export default store;