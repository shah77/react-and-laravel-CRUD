import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import NewItem from './NewItem';
import EditTask from './EditTask';
import Header from './Header';
import PageError from './PageError';
import '../../css/app.css';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


export default class Index extends Component {
    render() {
        return (
            <Router>
                <div>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/NewItem" component={NewItem} />
                    <Route path="/task/edit/:id" component={EditTask} />
                    <Route path="/*" component={PageError} />
                </Switch>
                <br/>
                </div>
            </Router>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}
