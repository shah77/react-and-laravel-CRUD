import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Message, Container } from 'semantic-ui-react'

export default class ErrorMsg extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
           <Container className="errorMsg">
                <Message color='red'>{this.props.passedMsg}</Message>
           </Container>
        );
    }
}
