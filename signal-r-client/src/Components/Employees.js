import React from "react";
import {connect} from "react-redux";

class Employees extends React.Component {

    render() {
        return <div>
            {this.props.hasData ? <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.employees.map((emp, index) => <tr key={index}>
                        <td>{emp.id}</td>
                        <td>{emp.name}</td>
                        <td>{emp.age}</td>
                    </tr>)
                }
                </tbody>
            </table> : <div> No records </div>
            }
        </div>
    }
}

const mapStateToProps = (state) => {
    console.info(state);
    return {
        employees: state.employees,
        hasData: state.employees && state.employees.length > 0
    };
};

export default connect(mapStateToProps)(Employees);