import React, {Component} from 'react';
import { Button, Loader, Form, Dimmer, Modal, Image, Container } from 'semantic-ui-react'
import axios from 'axios';
import SuccessMsg from './SuccessMsg';
import ErrorMsg from './ErrorMsg';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

export default class NewItem extends Component {
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
            errorMsg: '',   
            selectedDay: '',
            isEmpty: true,
            isDisabled: false,
        }
    }

    handleDayChange1(taskStartDate, modifiers, dayPickerInput) {
        const input = dayPickerInput.getInput();
        
        this.setState({
          taskStartDate,
          isEmpty: !input.value.trim(),
          isDisabled: modifiers.disabled === true,
        });
        console.log("start date:", taskStartDate.toLocaleString("en-us"))
    }

    handleDayChange2(taskDate, modifiers, dayPickerInput) {
        const input = dayPickerInput.getInput();
        this.setState({
            taskDate,
          isEmpty: !input.value.trim(),
          isDisabled: modifiers.disabled === true,
        });
        console.log("start date:", taskDate);
    }

    onChangeTask(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();

        const { taskName, taskDate, taskPercentage, taskBy, taskDesc, taskStartDate, taskTo } = this.state
        
        if( (taskName && taskDate && taskPercentage && taskBy && taskDesc && taskStartDate && taskTo) == '' ){
            this.setState({errorMsg:"Input field cannot be blank!"});
            this.errorResult();
        }
         else{
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
        
                axios.post('/api/task/store',tasks)
                .then(res=>{
                    this.setState({successMsg:"New task created successfully"});
                    this.successResult();
                }).catch(error=>{
                    this.setState({errorMsg:"Failed to create new task!"});
                    this.errorResult();
                })
            }
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
                
                {this.state.alertMsg=="success"?<SuccessMsg passedMsg={this.state.successMsg}/>:null}
                {this.state.alertMsg=="error"?<ErrorMsg passedMsg={this.state.errorMsg}/>:null}
                <br/>
                <div className="topSpace">
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                    <label>Task Name</label>
                    <input type="text"
                    name="taskName" 
                    value={this.state.taskName} 
                    onChange={this.onChangeTask} 
                    placeholder='Project name'/>
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
                    <Button type="submit" color='blue' type='submit'>Create</Button>
                </Form>
                </div>
                </Container>
            </div>
        );
    }
}