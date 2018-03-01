import React from "react";
import {connect} from "react-redux";

class Employees extends React.Component {

    render() {
        return <div>
            {this.props.employees ? (this.props.employees.map(emp =>
                <div key={emp.id}>{emp.id} : {emp.name} - {emp.age} years</div>
            )) : <div>
                No records
            </div>}
        </div>
    }
}

const mapStateToProps = (state) => {
    console.info(state);
    return {
        employees : state.employees
    };
};

export default connect(mapStateToProps)(Employees);