import React, {Component} from 'react';
import {Link, Route} from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header>
                    <Link to="/">Home</Link>
                    <Link to="/about-us">About us</Link>
                </header>
                <main>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/about-us" component={About}/>
                </main>
            </div>
        );
    }
}

export default App;
