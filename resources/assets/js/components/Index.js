import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Index extends Component {
    render() {
        return (
            <div>
                <h1>Hey, { window.name }</h1>
            </div>
        );
    }
}

export default Index;

// We only want to try to render our component on pages that have a div with an ID
// of "index"; otherwise, we will see an error in our console
if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}