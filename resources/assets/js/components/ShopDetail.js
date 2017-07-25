import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ImagesUploader from 'react-images-uploader';
import { endpoint } from '../endpoint';
import 'react-images-uploader/styles.css';

class ShopDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: window.user,
            mode: window.mode,
            shop: {},
            images: []
        }

        this.editMode = this.editMode.bind(this);
        this.viewMode = this.viewMode.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    renderUploader() {
        return (
            <ImagesUploader
				url={endpoint.images}
				optimisticPreviews
				onLoadEnd={(err, imagePath) => {
                    this.state.images.push(imagePath);
				}}
                deleteImage={(index) => {
                    this.state.images.splice(index, 1);
                    console.log(this.state.images)
                }}
				label="Upload images"
				/>
        );
    }

    renderDetail() {
        return (
            <form onChange={this.handleChange}>
                <div className="form-group">
                    <label htmlFor="inputName">Shop’s name:</label>
                    <input type="text" className="form-control"
                        placeholder="shop's name"
                        name="name"
                        defaultValue={this.state.shop.name}
                        readOnly={this.state.mode === 'VIEW'}/>
                </div>
                <div className="form-group row">
                    <div className="col-md-12">
                        <label htmlFor="inputName">Shop’s location:</label>
                    </div>
                    <div className="col-md-6">
                        <div className="input-group">
                            <div className="input-group-addon">lat</div>
                            <input type="text" className="form-control" placeholder="latitude"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-group">
                            <div className="input-group-addon">lng</div>
                            <input type="text" className="form-control" placeholder="longitude"/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="form-group">
                    { this.renderUploader() }
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
            </div>
        );
    }
}

export default ShopDetail;

if (document.getElementById('shop-detail')) {
    ReactDOM.render(<ShopDetail />, document.getElementById('shop-detail'));
}