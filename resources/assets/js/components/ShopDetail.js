import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { endpoint } from '../endpoint';
import UserDetail from './UserDetail';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import FileUpload from 'react-fileupload';

class ShopDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: window.user,
            mode: window.mode,
            shop: window.shop || {},
            images: [],
            token: window.token,
        }

        console.log(window.shop)

        this.editMode = this.editMode.bind(this);
        this.viewMode = this.viewMode.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onApprove = this.onApprove.bind(this);
        this.save = this.save.bind(this);
    }

    componentWillMount() {
        const user = this.state.user;
        if ( user.role !== 'SELLER') {
            alert(`${user.first_name} ${user.last_name} isn't SELLER.`);
            document.location = '/user-management';
        }
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
        const shop = this.state.shop;
        shop['images'] = this.state.images;
        shop['user_id'] = this.state.user.id;

        // edit mode
        if (shop.id) {
            fetch(`${endpoint.shops}/${shop.id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.state.token}`,
                },
                body: JSON.stringify(shop)
            })
                .then(response => {
                    return response.json();
                })
                .then(user => {
                    NotificationManager.success('Shop edited', 'SUCCESS');
                })
                .catch(error => {
                    NotificationManager.error('', 'ERROR');
                });
            return;
        }

        // create mode
        fetch(`${endpoint.shops}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`,
            },
            body: JSON.stringify(shop)
        })
            .then(response => {
                return response.json();
            })
            .then(user => {
                NotificationManager.success('Shop saved', 'SUCCESS');
            })
            .catch(error => {
                NotificationManager.error('', 'ERROR');
            });
    }

    renderImages() {
        return (
            <div>
                <ul>
                    {
                        this.state.images.map(image => (
                            <li>{image.path}</li>
                        ))
                    }
                </ul>
            </div>
        );
    }

    renderUploader() {
        const options={
            baseUrl: `${endpoint.images}`,
            uploadSuccess : (resp) => {
                const images = this.state.images.concat(resp);
                this.setState({
                    images
                });
                console.log(this.state.images);
            },
        };
        return (
            <FileUpload options={options}>
                <button type='button' ref="chooseBtn">choose</button>
                <button type='button' ref="uploadBtn">upload</button>
            </FileUpload>
        )
    }

    onApprove(e) {
        const value = e.target.dataset.val;
        const shop = this.state.shop;
        shop.is_approved = value === 'true';
        this.setState({
            shop
        });
    }

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        const shop = this.state.shop;
        shop[name] = value;
        this.setState({
            shop
        });
    }

    renderDetail() {
        return (
            <form onChange={this.handleChange}>
                <div className="form-group">
                    <label htmlFor="inputName">Shop’s name:</label>
                    <input type="text" className="form-control"
                        placeholder="shop's name"
                        name="shop_name"
                        defaultValue={this.state.shop.shop_name}
                        readOnly={this.state.mode === 'VIEW'}/>
                </div>
                <div className="form-group row">
                    <div className="col-md-12">
                        <label htmlFor="inputName">Shop’s location:</label>
                    </div>
                    <div className="col-md-6">
                        <div className="input-group">
                            <div className="input-group-addon">lat</div>
                            <input type="text" className="form-control" placeholder="latitude"
                                name="lat"
                                defaultValue={this.state.shop.lat}
                                readOnly={this.state.mode === 'VIEW'}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-group">
                            <div className="input-group-addon">lng</div>
                            <input type="text" className="form-control" placeholder="longitude"
                                name="lng"
                                defaultValue={this.state.shop.lng}
                                readOnly={this.state.mode === 'VIEW'}/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="form-group">
                    { this.renderUploader() }
                    { this.renderImages() }
                </div>
                <div className="form-group">
                    {
                        (this.state.shop.is_approved) ?
                            (
                                <button type='button' className="btn btn-success"
                                    data-val="false"
                                    onClick={this.onApprove}>Approved</button>
                            )
                        :
                            (
                                <button type='button' className="btn btn-default"
                                    data-val="true"
                                    onClick={this.onApprove}>Approve</button>
                            )
                    }
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
                    (<h3>Create new shop</h3>)
                }
                <hr/>
                { this.renderDetail() }
                <hr/>
                <UserDetail user={this.state.user} mode="VIEW" />
                <NotificationContainer/>
            </div>
        );
    }
}

export default ShopDetail;

if (document.getElementById('shop-detail')) {
    ReactDOM.render(<ShopDetail />, document.getElementById('shop-detail'));
}