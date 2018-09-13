import React, {Component} from 'react';
import { Table, Button, Grid, Header, Segment, Modal, Icon, Container, Popup } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            tasks:[],
            modalOpen: false,
            modalOpenView: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleCloseView = this.handleCloseView.bind(this);
        this.handleOpenView = this.handleOpenView.bind(this);
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/task').then(response=>{
            this.setState({tasks:response.data});
        });
    }

    onDelete(task_id){
        axios.delete('http://127.0.0.1:8000/api/task/delete/'+task_id)
        .then(response=>{
            var tasks = this.state.tasks;
            for(var i=0; i< tasks.length; i++){
                if(tasks[i].id==task_id){
                    tasks.splice(i,1);
                    this.setState({task:tasks});
                    this.handleClose();
                }
            }
        });
    }

    viewDetail(task_id){
        axios.get('http://127.0.0.1:8000/api/task/show/'+this.props.match.params.id)
        .then(response=>{
            this.setState({
                viewName:response.data.name
            })
        });
    }

    handleOpen(){
        this.setState({ modalOpen: true });
    }

    handleClose(){
        this.setState({ modalOpen: false });
    }

    handleOpenView(){
        this.setState({ modalOpenView: true });
    }

    handleCloseView(){
        this.setState({ modalOpenView: false });
    }

    render() {
        return (
            <div>
            <Container>
            <br/><br/><br/><br/>
            
            <Grid stackable columns={2}>
            {
                this.state.tasks.map((task, i)=>{
                return(
            
                <Grid.Column key={i}>
                <Segment>
                <center><h3 className="upperCase">{task.name}</h3></center>
                <table>
                    <tbody>
                    <tr>
                        <td>No</td>
                        <td>:</td>
                        <td>{i+1}</td>
                    </tr>
                    <tr>
                        <td>Start date</td>
                        <td>:</td>
                        <td>{task.startDate}</td>
                    </tr>
                    <tr>
                        <td>End date</td>
                        <td>:</td>
                        <td>{task.dueDate}</td>
                    </tr>
                    <tr>
                        <td>Assigned to</td>
                        <td>:</td>
                        <td>{task.assignedTo}</td>
                    </tr>
                    </tbody>
                </table>
                <br/>

                <Modal 
                    trigger={<Popup trigger={<Button className="buttonRight" onClick={this.handleOpen} color="red" icon='trash'/>} content='Delete task' inverted />} closeIcon
                    centered={false}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    >
                    <Header className="popUpHeader" icon='trash' content='Delete task' />
                    <Modal.Content>
                    <p>
                        Are you sure want to delete <b>{task.name}</b> permanently?
                    </p>
                    </Modal.Content>
                    <Modal.Actions>
                    <Button onClick={this.handleClose} color='red'>
                        <Icon name='remove' /> No
                    </Button>
                    <Button onClick={this.onDelete.bind(this,task.id)} color='green'>
                        <Icon name='checkmark' /> Yes
                    </Button>
                    </Modal.Actions>
                </Modal>

                <Link to={`/task/edit/${task.id}`}><Popup trigger={<Button className="buttonRight" color="blue" icon='edit'/>} content='Edit task' inverted /></Link>

                <Modal trigger={<Popup trigger={
                    <Button onClick={this.handleOpenView} className="buttonRight" color="green" icon='eye'/>} content='View task' inverted />
                    } centered={false} closeIcon
                    open={this.state.modalOpenView}
                    onClose={this.handleCloseView}
                    >
                    <Header className="popUpHeader" icon='file alternate' content='Task details' />
                    <Modal.Content>
                    <center><p className="upperCase title">{task.name}</p></center>
                    <table>
                        <tbody>
                            <tr>
                                <td>Percentage</td>
                                <td>:</td>
                                <td>{task.percentage}%</td>
                            </tr>
                            <tr>
                                <td>Start Date</td>
                                <td>:</td>
                                <td>{task.startDate}</td>
                            </tr>
                            <tr>
                                <td>End Date</td>
                                <td>:</td>
                                <td>{task.dueDate}</td>
                            </tr>
                            <tr>
                                <td>Creator</td>
                                <td>:</td>
                                <td>{task.createdBy}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>:</td>
                                <td>{task.description}</td>
                            </tr>
                            <tr>
                                <td>Created Date</td>
                                <td>:</td>
                                <td>{task.created_at}</td>
                            </tr>
                        </tbody>
                    </table>
                    </Modal.Content>
                </Modal>
                <br/><br/>
                </Segment>
                </Grid.Column>
                    )
                })
            }
             </Grid>
            </Container>
            </div>
        );
    }
}
