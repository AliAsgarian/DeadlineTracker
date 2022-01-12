import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route} from "react-router-dom";


import Navbar from "./components/navbar.component"
import DeadlinesList from "./components/deadlinesList.component";
import EditDeadline from "./components/editDeadline.component";
import AddDeadline from "./components/AddDeadline.component";
import AddCourse from "./components/AddCourse.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br/>
      <Route path="/" exact component={DeadlinesList} />
      <Route path="/edit/:id" component={EditDeadline} />
      <Route path="/addDeadline" component={AddDeadline} />
      <Route path="/course" component={AddCourse} />
    </Router>
  );
}

export default App;