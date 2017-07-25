import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import { endpoint } from '../endpoint';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class UserDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: window.user,
            mode: window.mode
        }

        this.editMode = this.editMode.bind(this);
        this.viewMode = this.viewMode.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBirthDateChange = this.handleBirthDateChange.bind(this);
        this.save = this.save.bind(this);
    }

    editMode() {
        this.setState({
            mode: 'EDIT'
        });
    }

    viewMode() {
        this.setState({
            mode: 'VIEW'
        });
    }

    save() {
        const user = this.state.user;

        // edit mode
        if (user.id) {
            console.log('user', user);
            fetch(`${endpoint.users}/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
                .then(response => {
                    return response.json();
                })
                .then(user => {
                    document.location = '/user-management';
                });
            return;
        }

        // create mode
        fetch(`${endpoint.users}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                return response.json();
            })
            .then(user => {
                document.location = '/user-management';
            });
    }

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        const user = this.state.user;
        user[name] = value;
        this.setState({
            user
        });
    }

    handleBirthDateChange(date) {
        const user = this.state.user;
        user.birth_date = date;
        this.setState({
            user
        });
    }

    renderDetail() {
        return (
            <form onChange={this.handleChange}>
                <div className="form-group">
                    <label htmlFor="inputName">Username:</label>
                    <input type="text" className="form-control"
                        placeholder="username"
                        name="username"
                        defaultValue={this.state.user.username}
                        readOnly={this.state.mode === 'VIEW'}/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputName">E-mail:</label>
                    <input type="email" className="form-control"
                        placeholder="e-mail"
                        name="email"
                        defaultValue={this.state.user.email}
                        readOnly={this.state.mode === 'VIEW'}/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputName">Password:</label>
                    <input type="password" className="form-control"
                        placeholder="password"
                        name="password"
                        readOnly={this.state.mode === 'VIEW'}/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputName">First name:</label>
                    <input type="text" className="form-control"
                        placeholder="first name"
                        name="first_name"
                        defaultValue={this.state.user.first_name}
                        readOnly={this.state.mode === 'VIEW'}/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputName">Last name:</label>
                    <input type="text" className="form-control"
                        placeholder="last name"
                        name="last_name"
                        defaultValue={this.state.user.last_name}
                        readOnly={this.state.mode === 'VIEW'}/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputName">Birth date: </label>
                    <DatePicker
                        selected={this.state.user.birth_date ? moment(this.state.user.birth_date) : ''}
                        onChange={this.handleBirthDateChange}
                        disabled={this.state.mode === 'VIEW'}
                        placeholderText='birth date'
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputName">Phone:</label>
                    <input type="text" className="form-control"
                        placeholder="phone"
                        name="phone"
                        defaultValue={this.state.user.phone}
                        readOnly={this.state.mode === 'VIEW'}/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputName">Critizen Id:</label>
                    <input type="text" className="form-control"
                        placeholder="critizen id"
                        name="critizen_id"
                        defaultValue={this.state.user.critizen_id}
                        readOnly={this.state.mode === 'VIEW'}/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputName">Role:</label>
                    <select name='role' className="form-control"
                        defaultValue={this.state.user.role}
                        onChange={this.handleChange}
                        required>
                        <option defaultValue='BUYER'>BUYER</option>
                        <option defaultValue='SHIPPER'>SHIPPER</option>
                        <option defaultValue='SELLER'>SELLER</option>
                        <option defaultValue='ADMIN'>ADMIN</option>
                    </select>
                </div>
                <hr/>
                <div className="form-group">
                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.save}>
                        Save
                    </button>
                </div>
            </form>
        );
    }

    render() {
        return (
            <div>
                {
                    (this.state.mode === 'VIEW') ?
                    (<button className="btn btn-primary" onClick={this.editMode}>EDIT MODE</button>) :
                    (this.state.mode === 'EDIT') ? (<button className="btn btn-default" onClick={this.viewMode}>VIEW MODE</button>) :
                    (<h3>Create new user</h3>)
                }
                <hr/>
                { this.renderDetail() }
            </div>
        );
    }
}

export default UserDetail;

// We only want to try to render our component on pages that have a div with an ID
// of "user-detail"; otherwise, we will see an error in our console
if (document.getElementById('user-detail')) {
    ReactDOM.render(<UserDetail />, document.getElementById('user-detail'));
}