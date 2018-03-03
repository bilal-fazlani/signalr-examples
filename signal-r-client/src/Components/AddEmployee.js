import React from "react";
import {Field, reduxForm} from "redux-form";
import {addNewEmployeeAsync} from "../reducers/employees";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class AddEmployee extends React.Component {
    render() {
        const { addNewEmployeeAsync, pristine, reset, submitting, adding } = this.props;
        return <div>
            <h1>Add new employee</h1>
            <div>
                <form onSubmit={addNewEmployeeAsync}>
                    <div>
                        <label>Name</label>
                        <div>
                            <Field
                                name='name'
                                type='text'
                                placeholder='Name'
                                component='input'/>
                        </div>
                    </div>
                    <div>
                        <label>Age</label>
                        <div>
                            <Field
                                name='age'
                                type='number'
                                placeholder='Age'
                                component='input'/>
                        </div>
                    </div>
                    <div>
                        <br/>
                        <button type="submit" disabled={pristine || submitting || adding}>Save</button>
                        &nbsp;
                        <button type="button" disabled={pristine || submitting || adding} onClick={reset}>Clear</button>
                    </div>

                    {adding? <div>
                        Saving...
                    </div>: null}
                </form>
            </div>
        </div>
    }
}

const form = reduxForm({
    form: 'add-new-employee-form', // a unique identifier for this form
})(AddEmployee);

const mapStateToProps = (state) => {
    return {
        adding : state.employees && state.employees.adding === true
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    addNewEmployeeAsync
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(form);
