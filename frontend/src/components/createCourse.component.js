import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component{

    constructor(props){
        super(props);
        //use state to make vars

        this.onChangeCourse = this.onChangeCourse.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            course:'',
        }
    }

    onChangeCourse(e){ 
        this.setState({
            course: e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();

        const CourseVar = {
            course: this.state.course,
        }

        console.log(CourseVar); //make this submit to mogodb later
        axios.post('http://localhost:5000/courses/add', CourseVar)
        .then(res => console.log(res.data))

        window.location = '/'; //takes them back to main page
    }

    render(){
        return (
            <div className="container">
                <h3>Add New Course</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Course: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.course}
                            onChange={this.onChangeCourse}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Add Course"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        )
    }
}