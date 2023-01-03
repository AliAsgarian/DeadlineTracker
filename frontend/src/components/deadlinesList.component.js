import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Deadline = props => (
    
    <tr>
        <td>{props.deadline.course}</td>
        <td>{props.deadline.description}</td>
        <td>{props.deadline.weight}</td>
        {/* we only want the first part of the date */}
        <td>{props.deadline.dueDate.substring(0,10)}</td>
    
        <td>
            <button style={{marginLeft: "2px", padding: "4px", borderRadius: "5px"}}>
            <Link to={"/edit/"+props.deadline._id} style={{color: "black", textDecoration: "none"}}>edit</Link>
            </button>
            <button onClick={() => {props.deleteDeadline(props.deadline._id) }} style={{marginLeft: "2px", padding: "4px", borderRadius: "5px"}}>
                delete
            </button>
        </td>
    </tr>
)

//implemented as a class component
export default class DeadlineList extends Component{
    constructor(props){
        super(props);

        this.deleteDeadline = this.deleteDeadline.bind(this);

        this.state = {deadlines: []};
    }

    componentDidMount(){
        axios.get('https://deadlinetracker-backend.onrender.com/deadlines/')
        .then(response => {
            this.setState({deadlines: response.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteDeadline(id) {
        axios.delete('https://deadlinetracker-backend.onrender.com/deadlines/'+id)
        .then(res => console.log(res.data));

        this.setState({
            deadlines: this.state.deadlines.filter(el => el._id !== id)
        })
    }
    

    deadlineList() {
        return this.state.deadlines.map(currentDeadline => {
            return <Deadline 
                        deadline={currentDeadline} 
                        deleteDeadline={this.deleteDeadline} 
                        key={currentDeadline._id}
                    />
        })
    }
    
    render(){
        return (
            <div className="container">
                <h3>Deadlines</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Course</th>
                            <th>Description</th>
                            <th>Weight</th>
                            <th>Due Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                
                <tbody>
                    {this.deadlineList() }
                </tbody>
                </table>
            </div>
        )
    }
    
}