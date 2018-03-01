import React from "react";
import Employees from "./Employees";

class Home extends React.Component{
    render(){
        return <div>
            <h1>
                Dashboard
            </h1>
            <Employees />
        </div>;
    }
}

export default Home;