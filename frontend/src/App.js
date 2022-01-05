import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route} from "react-router-dom";


import Navbar from "./components/navbar.component"
import DeadlinesList from "./components/deadlinesList.component";
import EditDeadline from "./components/editDeadline.component";
import CreateDeadline from "./components/createDeadline.component";
import CreateCourse from "./components/createCourse.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br/>
      <Route path="/" exact component={DeadlinesList} />
      <Route path="/edit/:id" component={EditDeadline} />
      <Route path="/create" component={CreateDeadline} />
      <Route path="/course" component={CreateCourse} />
    </Router>
  );
}

export default App;