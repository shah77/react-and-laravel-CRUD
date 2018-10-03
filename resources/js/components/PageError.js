import React, {Component} from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import { Button, Message, Container } from 'semantic-ui-react';


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
