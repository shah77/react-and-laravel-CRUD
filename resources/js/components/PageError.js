import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home';
import NewItem from './NewItem';
import EditTask from './EditTask';
import { Button, Message, Container, Header } from 'semantic-ui-react';


export default class PageError extends Component {

    render() {

        return (
            <Container>
                <br/><br/>
                <Message negative>
                <center>
                    <Message.Header>404 page not found!</Message.Header>
                    <br/>
                    <Link to="/"><Button color="red">Home</Button></Link>
                </center>
                </Message>
            </Container>
        );
    }
}
