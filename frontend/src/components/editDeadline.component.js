import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';


export default class EditDeadline extends Component {
    constructor(props){
        super(props);

        this.onChangeCourse = this.onChangeCourse.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onChangeDueDate = this.onChangeDueDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            course:'',
            description: '',
            weight: 0,
            dueDate: new Date(),
            courses: []
        }
    }

    componentDidMount() {
        axios.get('https://deadlinetracker-ali.herokuapp.com/deadlines/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                course: response.data.course,
                description: response.data.description,
                weight: response.data.weight,
                dueDate: new Date(response.data.dueDate)
            })   
        })
        .catch(function (error) {
            console.log(error);
        })

        axios.get('https://deadlinetracker-ali.herokuapp.com/courses/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    courses: response.data.map(CourseVar => CourseVar.course),
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })

    }

    onChangeCourse(e){ 
        this.setState({
            course: e.target.value
        });
    }

    onChangeDescription(e){ 
        this.setState({
            description: e.target.value
        });
    }

    onChangeWeight(e){
        this.setState({
            weight: e.target.value
        });
    }

    onChangeDueDate(date){ //uses library to make calender appear and allow user to choose date
        this.setState({
            dueDate: date
        });
    }

    onSubmit(e){
        e.preventDefault();

        const deadline = {
            course: this.state.course,
            description: this.state.description,
            weight: this.state.weight,
            dueDate: this.state.dueDate
        }

        console.log(deadline); //make this submit to mogodb later
        axios.post('https://deadlinetracker-ali.herokuapp.com/deadlines/update/' + this.props.match.params.id, deadline)
        .then(res => console.log(res.data))

        window.location = '/'; //takes them back to main page
    }


    render(){
        return (
            <div className="container">
                <h3>Edit Deadline</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Course: </label>
                        <select ref="UserInput"
                        required
                        className="form-control"
                        value={this.state.course}
                        onChange ={this.onChangeCourse}>
                        {
                            this.state.courses.map(function(course){
                                return <option
                                key={course}
                                value={course}>{course}
                                </option>;
                            })
                        }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>

                    <div className="form-group">
                        <label>Weight (in %)</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.weight}
                            onChange={this.onChangeWeight}
                            />
                    </div>

                    <div className = "form-group">
                        <label>Due Date: </label>    
                        <div>
                            {/* //npm react-datepicker */}
                            <DatePicker
                                selected={this.state.dueDate}
                                onChange={this.onChangeDueDate}
                            />
                        </div>                    
                    </div>
                    <br/>
                    <div className="form-group">
                        <input 
                            type="submit" 
                            value="Edit Deadline" 
                            className="btn btn-primary" 
                        />
                    </div>
                </form>
            </div>
        )
    }
}