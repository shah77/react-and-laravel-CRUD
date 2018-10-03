import React, {Component} from 'react';
import axios from 'axios';
import ErrorMsg from './ErrorMsg';
import SuccessMsg from './SuccessMsg';
import 'react-day-picker/lib/style.css';
import { Button, Form, Container } from 'semantic-ui-react';
import DayPickerInput from 'react-day-picker/DayPickerInput';

export default class EditTask extends Component {

    constructor(props){
        super(props);
        this.onChangeTask = this.onChangeTask.bind(this);
        this.handleDayChange1 = this.handleDayChange1.bind(this);
        this.handleDayChange2 = this.handleDayChange2.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            taskName: '',
            taskDate: '',
            taskPercentage: '',
            taskBy: '',
            taskDesc: '',
            taskStartDate:'',
            taskTo:'',
            alertMsg: '',
            successMsg: '',
            errorMsg: ''
        }
    }

    componentDidMount(e){
        axios.get('http://127.0.0.1:8000/api/task/edit/'+this.props.match.params.id)
        .then(response=>{
            this.setState({
                taskName:response.data.name,
                taskDate:response.data.dueDate,
                taskPercentage:response.data.percentage,
                taskBy:response.data.createdBy,
                taskDesc:response.data.description,
                taskStartDate:response.data.startDate,
                taskTo:response.data.assignedTo
            })
        });
    }

    onChangeTask(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    handleDayChange1(taskStartDate, modifiers, dayPickerInput) {
        const input = dayPickerInput.getInput();
        this.setState({
          taskStartDate,
          isEmpty: !input.value.trim(),
          isDisabled: modifiers.disabled === true,
        });
    }

    handleDayChange2(taskDate, modifiers, dayPickerInput) {
        const input = dayPickerInput.getInput();
        this.setState({
            taskDate,
          isEmpty: !input.value.trim(),
          isDisabled: modifiers.disabled === true,
        });
    }

    onSubmit(e){
        e.preventDefault();
        
        if(this.state.taskStartDate > this.state.taskDate){
            this.setState({errorMsg:"Start date must be earlier than end date!"});
            this.errorResult();
        }
        else{
            const tasks = {
                taskName : this.state.taskName,
                taskDate : this.state.taskDate,
                taskPercentage : this.state.taskPercentage, 
                taskBy : this.state.taskBy,
                taskDesc : this.state.taskDesc,
                taskStartDate : this.state.taskStartDate,
                taskTo : this.state.taskTo   
            }   

            axios.put('http://127.0.0.1:8000/api/task/update/'+this.props.match.params.id, tasks)
            .then(res=>{
                this.setState({successMsg:"Task updated successfully"});
                this.successResult();
            }).catch(error=>{
                this.setState({errorMsg:"Failed to update task!"});
                this.errorResult();
            })
        }
    }

    successResult(){
        this.setState({alertMsg:"success"})
        setTimeout(() => {
            this.setState({alertMsg:""})
        }, 2000);
    }

    errorResult(){
        this.setState({alertMsg:"error"});
        setTimeout(() => {
            this.setState({alertMsg:""})
        }, 2000);
    }

    render() {
        return (
            <div>
                <Container>
                <br/>
                {this.state.alertMsg=="success"?<SuccessMsg passedMsg={this.state.successMsg}/>:null}
                {this.state.alertMsg=="error"?<ErrorMsg passedMsg={this.state.errorMsg}/>:null}

                <div className="topSpace">
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                    <label>Task Name</label>
                    <input type="text"
                    name="taskName" 
                    value={this.state.taskName} 
                    onChange={this.onChangeTask} 
                    placeholder='Project name' />
                    </Form.Field>
                    
                    <Form.Field>
                    <label>Start Date</label>
                    <DayPickerInput
                    name="taskStartDate" 
                    value={this.state.taskStartDate}
                    onDayChange={this.handleDayChange1}
                    dayPickerProps={{
                        selectedDays: this.state.taskStartDate,
                        disabledDays: {
                        daysOfWeek: [0, 6],
                        },
                    }}
                    />
                    </Form.Field>

                    <Form.Field>
                    <label>End Date</label>
                    <DayPickerInput
                    name="taskDate" 
                    value={this.state.taskDate}
                    onDayChange={this.handleDayChange2}
                    dayPickerProps={{
                        selectedDays: this.state.taskDate,
                        disabledDays: {
                        daysOfWeek: [0, 6],
                        },
                    }}/>
                    </Form.Field>

                    <Form.Field>
                    <label>Percentage</label>
                    <input 
                    type="number" 
                    min="0"
                    max="100"
                    name="taskPercentage" 
                    value={this.state.taskPercentage} 
                    onChange={this.onChangeTask} 
                    placeholder='Percentage' />
                    </Form.Field>

                    <Form.Field>
                    <label>Created by</label>
                    <input 
                    type="text" 
                    name="taskBy" 
                    value={this.state.taskBy} 
                    onChange={this.onChangeTask} 
                    placeholder='Created by' />
                    </Form.Field>

                    <Form.Field>
                    <label>Assigned To</label>
                    <input 
                    type="text" 
                    name="taskTo" 
                    value={this.state.taskTo} 
                    onChange={this.onChangeTask} 
                    placeholder='Created by' />
                    </Form.Field>

                    <Form.Field>
                    <label>Description</label>
                    <textarea 
                    name="taskDesc" 
                    value={this.state.taskDesc} 
                    onChange={this.onChangeTask}  
                    placeholder='Project description...'>
                    </textarea>
                    </Form.Field>
                    <Button type="submit" color='blue' type='submit'>Update</Button>
                </Form>
                </div>
                </Container>
            </div>
        );
    }
}
