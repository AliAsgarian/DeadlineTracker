import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-success navbar-expand-lg" >
        <Link to="/" className="navbar-brand">DeadlineTracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/addDeadline" className="nav-link">Add Deadline</Link>
          </li>
          <li className="navbar-item">
          <Link to="/course" className="nav-link">Add Course</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}