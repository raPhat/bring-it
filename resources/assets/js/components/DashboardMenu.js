import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class DashboardMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {

            // เมนูหน้า dashbaord
            menus: [
                {
                    icon: 'fa-address-book',
                    text: 'USER MANAGEMENT',
                    link: '/user-management'
                },
                {
                    icon: 'fa-bank',
                    text: 'SHOP MANAGEMENT',
                    link: '/shop-management'
                }
            ]
        }
    }

    renderMenus() {
        return this.state.menus.map((menu, index) => {
            return (
                <div className='col-md-3 col-sm-4 col-xs-6' key={index}>
                    <a href={menu.link}>
                        <div className='dashboard--menu--item'>
                            <div className='icon'>
                                <i className={ 'fa ' + menu.icon } aria-hidden='true'></i>
                            </div>
                            <div className='text'>
                                { menu.text }
                            </div>
                        </div>
                    </a>
                </div>
            );
        });
    }

    render() {
        return (
            <div className='dashboard--menu row'>
                { this.renderMenus() }
            </div>
        );
    }
}

export default DashboardMenu;

// We only want to try to render our component on pages that have a div with an ID
// of 'DashboardMenu'; otherwise, we will see an error in our console
if (document.getElementById('dashboard-menu')) {
    ReactDOM.render(<DashboardMenu />, document.getElementById('dashboard-menu'));
}