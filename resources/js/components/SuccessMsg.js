import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Message, Container } from 'semantic-ui-react'

export default class SuccessMsg extends Component {
    constructor(props){
        super(props);
    }

    render() {
        
        return (
           <Container className="successMsg">
              <Message className="alertMsg" color='green'>{this.props.passedMsg}</Message>
              <br/>
           </Container>
        );
    }
}
