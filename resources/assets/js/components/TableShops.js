import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { endpoint } from '../endpoint';
import * as _ from 'lodash';
import Select from 'react-select';

import 'react-select/dist/react-select.css';

class TableShops extends Component {

    constructor(props) {
        super(props);

        this.state = {
            shops: [],
            keyword: '',
            select: '',
            token: window.token
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    componentDidMount() {
        fetch(`${endpoint.shops}`, {
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`
            },
        })
            .then(response => {
                return response.json();
            })
            .then(shops => {
                console.log(shops);
                this.setState({ shops });
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

        fetch(`${endpoint.shops}/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                return response.json();
            })
            .then(shop => {
                const shops = this.state.shops;
                const index = _.findIndex(shops, {id: shop.id});
                shops.splice(index, 1, shop);
                this.setState({
                    shops
                });
            });
        e.preventDefault();
        return false
    }

    onRemove(e) {
        if (confirm('Are you sure ?')) {
            const id = e.target.dataset.id;
            fetch(`${endpoint.shops}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.state.token}`
                }
            })
                .then(response => {
                    return response.json();
                })
                .then(shop => {
                    let shops = this.state.shops;
                    shops = shops.filter(u => u.id !== shop.id);
                    this.setState({
                        shops
                    });
                });
        }
        e.preventDefault();
        return false
    }

    renderTBody() {
        const filteredUsers = _.filter(this.state.shops, (shop) => {
            const keyword = this.state.keyword;
            const select = this.state.select;
            let checks = [];
            const result = _.forOwn(shop, (value, key) => {
                const val = value + '';
                checks.push(val.toLowerCase().indexOf(keyword.toLowerCase()) > -1);
            });
            if (select.length) {
                if (keyword == '') {
                    checks = [];
                }
                if (shop.is_approved && _.find(select, ['value', 'APRROVE'])) {
                    checks.push(true);
                }
                if (!shop.is_approved && _.find(select, ['value', 'NOAPPROVE'])) {
                    checks.push(true);
                }
            }
            return _.filter(checks, (check) => check).length;
        });

        return filteredUsers.map((shop, index) => {
            return (
                <tr key={index}>
                    <td className='column-id'>{ shop.id }</td>
                    <td>{ shop.shop_name }</td>
                    <td>{ shop.lat }</td>
                    <td>{ shop.lng }</td>
                    <td>{ shop.user.first_name } { shop.user.last_name }</td>
                    <td className='text-center'>
                        {
                            (shop.is_approved) ?
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
                                <li><a href={ `/shop-management/${shop.id}/view/${shop.user_id}` } role='button'>View</a></li>
                                <li><a href={ `/shop-management/${shop.id}/edit/${shop.user_id}` } role='button'>Edit</a></li>
                                <li role='separator' className='divider'></li>
                                <li><a href='#' onClick={this.onRemove}
                                    data-id={shop.id}
                                    role='button'>Remove</a></li>
                                <li role='separator' className='divider'></li>
                                {
                                    (shop.is_approved) ?
                                    (<li>
                                        <a href='#' onClick={this.onUpdate}
                                            data-id={shop.id}
                                            data-status='false'
                                            data-type='is_approved'
                                            role='button'>Unapprove</a>
                                    </li>) :
                                    (<li>
                                        <a href='#' onClick={this.onUpdate}
                                            data-id={shop.id}
                                            data-status='true'
                                            data-type='is_approved'
                                            role='button'>Approve</a>
                                    </li>)
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
            { value: 'APRROVE', label: 'Status - Approve' },
            { value: 'NOAPPROVE', label: 'Status - No approve' },
        ];
        return (
            <div className='filter-container'>
                <input type='text'
                className='form-control'
                placeholder='search... (name, location)'
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
                            <th width='20%'>Shop's name</th>
                            <th width='20%'>Latitude</th>
                            <th width='20%'>Longitude</th>
                            <th width='20%'>Seller</th>
                            <th width='10%' className='text-center'>Approve</th>
                            <th width='10%'> </th>
                        </tr>
                    </thead>
                    <tbody>{ this.renderTBody() }</tbody>
                </table>
            </div>
        );
    }
}

export default TableShops;

// We only want to try to render our component on pages that have a div with an ID
// of 'table-shops'; otherwise, we will see an error in our console
if (document.getElementById('table-shops')) {
    ReactDOM.render(<TableShops />, document.getElementById('table-shops'));
}