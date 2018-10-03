import React, {Component} from 'react';
import { BrowserRouter as Link } from 'react-router-dom';

export default class Header extends Component {
    constructor(){
        super();
    }

    dropDown(){
        var x = document.getElementById("myTopnav");

        if (x.className === "topnav") {
            x.className += " responsive";
        } 
        else {
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
