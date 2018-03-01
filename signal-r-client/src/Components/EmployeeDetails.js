import React from "react";
import {connect} from "react-redux";
import {loadEmployeeAsync} from "../reducers/employees";
import {bindActionCreators} from "redux";

class EmployeeDetails extends React.Component {

    async componentWillMount() {
        if (!this.props.employee) {
            await this.props.loadEmployeeAsync(this.props.employeeId);
        }
    }

    render() {
        return <div>{
            this.props.loading ? <div>
                    Loading...
                </div> : <div>
                    <h3>
                        Employee details - {this.props.employee.id}
                    </h3>
                    <div>
                        {this.props.employee.name} ({this.props.employee.age} years)
                    </div>
                </div>
        }
        </div>
    }
}

const mapStateToProps = (state, ownProps) => {
    const employeeId = ownProps.match.params.id;
    const employee = state.employees && state.employees.data && state.employees.data.find(x => x.id == employeeId);
    const loading = state.employees.loading !== false ;
    return {
        employee,
        employeeId,
        loading
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    loadEmployeeAsync
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails);