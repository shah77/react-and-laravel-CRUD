import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home';
import NewItem from './NewItem';
import EditTask from './EditTask';
import { Menu, Segment } from 'semantic-ui-react';

export default class Header extends Component {
    constructor(){
        super();
    }

    dropDown(){
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }

    render() {
        return (
            <div className="topnav" id="myTopnav">
                <div className="logo">
                TASK MANAGER
                </div>
                <div className="menuList">
                <Link to="/">Home</Link>
                <Link to="/NewItem">Add item</Link>
                <a href="javascript:void(0);" className="icon" onClick={this.dropDown}>&#9776;</a>
                </div>
            </div>
        );
    }
}
