import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        const user = this.state.user;
        user[name] = value;
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
                        value={this.state.user.username}
                        readOnly={this.state.mode === 'VIEW'}/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputName">E-mail:</label>
                    <input type="text" className="form-control"
                        placeholder="e-mail"
                        name="email"
                        value={this.state.user.email}
                        readOnly={this.state.mode === 'VIEW'}/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputName">Firstname:</label>
                    <input type="text" className="form-control"
                        placeholder="firstname"
                        name="first_name"
                        value={this.state.user.first_name}
                        readOnly={this.state.mode === 'VIEW'}/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputName">Lastname:</label>
                    <input type="text" className="form-control"
                        placeholder="lastname"
                        name="last_name"
                        value={this.state.user.last_name}
                        readOnly={this.state.mode === 'VIEW'}/>
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