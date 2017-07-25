import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { endpoint } from '../endpoint';
import * as _ from 'lodash';
import Select from 'react-select';

import 'react-select/dist/react-select.css';

class TableUsers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            keyword: '',
            select: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    componentDidMount() {
        fetch('/api/users')
            .then(response => {
                return response.json();
            })
            .then(users => {
                this.setState({ users });
            });
    }

    handleChange(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    handleSelectChange(value) {
        this.setState({
            select: value
        });
    }

    onUpdate(e) {
        const id = e.target.dataset.id;
        const status = e.target.dataset.status;
        const type = e.target.dataset.type;
        const body = {};
        body[type] = (status === 'true') ? true : false;

        fetch(`${endpoint.users}/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                return response.json();
            })
            .then(user => {
                const users = this.state.users;
                const index = _.findIndex(users, {id: user.id});
                users.splice(index, 1, user);
                this.setState({
                    users
                });
            });
        e.preventDefault();
        return false
    }

    onRemove(e) {
        if (confirm('Are you sure ?')) {
            const id = e.target.dataset.id;
            fetch(`${endpoint.users}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    return response.json();
                })
                .then(user => {
                    let users = this.state.users;
                    users = users.filter(u => u.id !== user.id);
                    this.setState({
                        users
                    });
                });
        }
        e.preventDefault();
        return false
    }

    renderTBody() {
        const filteredUsers = _.filter(this.state.users, (user) => {
            const keyword = this.state.keyword;
            const select = this.state.select;
            let checks = [];
            const result = _.forOwn(user, (value, key) => {
                const val = value + '';
                checks.push(val.toLowerCase().indexOf(keyword.toLowerCase()) > -1);
            });
            if (select.length) {
                if (keyword == '') {
                    checks = [];
                }
                if (_.find(select, ['value', user.role])) {
                    checks.push(true);
                }
                if (user.is_approve && _.find(select, ['value', 'APPROVE'])) {
                    checks.push(true);
                }
                if (!user.is_approve && _.find(select, ['value', 'NOAPPROVE'])) {
                    checks.push(true);
                }
                if (user.is_banned && _.find(select, ['value', 'BANNED'])) {
                    checks.push(true);
                }
                if (!user.is_banned && _.find(select, ['value', 'NOBAN'])) {
                    checks.push(true);
                }
            }
            console.log('checks', checks);
            return _.filter(checks, (check) => check).length;
        });

        return filteredUsers.map((user, index) => {
            return (
                <tr key={index}>
                    <td className='column-id'>{ user.id }</td>
                    <td>{ user.first_name } { user.last_name }</td>
                    <td>{ user.email }</td>
                    <td>{ user.role }</td>
                    <td className='text-center'>
                        {
                            (user.is_approve) ?
                            (<span className="glyphicon glyphicon-ok-sign text-success icon-status"></span>) :
                            (<span className="glyphicon glyphicon-remove-sign text-danger icon-status"></span>)
                        }
                    </td>
                    <td className='text-center'>
                        {
                            (user.is_banned) ?
                            (<span className="glyphicon glyphicon-ok-sign text-success icon-status"></span>) :
                            (<span className="glyphicon glyphicon-remove-sign text-danger icon-status"></span>)
                        }
                    </td>
                    <td>
                        <div className='dropdown'>
                            <button className='btn btn-default dropdown-toggle' type='button' id='dropdownAction' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>
                                <span className='glyphicon glyphicon-option-vertical'></span>
                            </button>
                            <ul className='dropdown-menu' aria-labelledby='dropdownAction'>
                                <li><a href={ `/user-management/${user.id}` } role='button'>View</a></li>
                                <li><a href={ `/user-management/${user.id}/edit` } role='button'>Edit</a></li>
                                <li role='separator' className='divider'></li>
                                <li><a href='#' onClick={this.onRemove}
                                    data-id={user.id}
                                    role='button'>Remove</a></li>
                                {
                                    (user.is_banned) ?
                                    (<li>
                                        <a href='#' onClick={this.onUpdate}
                                            data-id={user.id}
                                            data-status='false'
                                            data-type='is_banned'
                                            role='button'>Unbanned</a>
                                    </li>) :
                                    (<li>
                                        <a href='#' onClick={this.onUpdate}
                                            data-id={user.id}
                                            data-status='true'
                                            data-type='is_banned'
                                            role='button'>Ban</a>
                                    </li>)
                                }
                                <li role='separator' className='divider'></li>
                                {
                                    (user.is_approve) ?
                                    (<li>
                                        <a href='#' onClick={this.onUpdate}
                                            data-id={user.id}
                                            data-status='false'
                                            data-type='is_approve'
                                            role='button'>Unapprove</a>
                                    </li>) :
                                    (<li>
                                        <a href='#' onClick={this.onUpdate}
                                            data-id={user.id}
                                            data-status='true'
                                            data-type='is_approve'
                                            role='button'>Approve</a>
                                    </li>)
                                }
                                <li role='separator' className='divider'></li>
                                {
                                    (user.role === 'SELLER') ? (
                                        <li><a href={ `/shop-management/create/${user.id}` } role='button'>Add Shop</a></li>
                                    ) : ''
                                }
                            </ul>
                        </div>
                    </td>
                </tr>
            );
        });
    }

    renderFilter() {
        const options = [
            { value: 'BUYER', label: 'Role - Buyer' },
            { value: 'SHIPPER', label: 'Role - Shipper' },
            { value: 'SELLER', label: 'Role - Seller' },
            { value: 'ADMIN', label: 'Role - Admin' },
            { value: 'APRROVE', label: 'Status - Approve' },
            { value: 'NOAPPROVE', label: 'Status - No approve' },
            { value: 'BANNED', label: 'Status - Banned' },
            { value: 'NOBAN', label: 'Status - No ban' },
        ];
        return (
            <div className='filter-container'>
                <input type='text'
                className='form-control'
                placeholder='search... (name, email, role)'
                value={this.state.keyword}
                onChange={this.handleChange}/>
                <hr/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="input-filter">Filters:</label>
                            <Select
                                name="form-field-name"
                                value={this.state.select}
                                options={options}
                                multi={true}
                                onChange={this.handleSelectChange}
                                />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                { this.renderFilter() }
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='column-id' width='10%'>#</th>
                            <th width='20%'>Fullname</th>
                            <th width='20%'>Email</th>
                            <th width='20%'>Role</th>
                            <th width='10%' className='text-center'>Approve</th>
                            <th width='10%' className='text-center'>Banned</th>
                            <th width='10%'> </th>
                        </tr>
                    </thead>
                    <tbody>{ this.renderTBody() }</tbody>
                </table>
            </div>
        );
    }
}

export default TableUsers;

// We only want to try to render our component on pages that have a div with an ID
// of 'table-users'; otherwise, we will see an error in our console
if (document.getElementById('table-users')) {
    ReactDOM.render(<TableUsers />, document.getElementById('table-users'));
}