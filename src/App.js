import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';

import Home from './components/Home';
import Login from './components/Login';
import ListCourses from './components/ListCourses';
import CreateCourse from './components/CreateCourse';
import ShowCourse from './components/ShowCourse';
import EditCourse from './components/EditCourse';
import CreateStudent from './components/CreateStudent';
import ShowStudent from './components/ShowStudent';
import StudentCourses from './components/StudentCourses';
import Header from './components/Header';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import ListPatients from './components/ListPatients';
import VitalSignsByPatient from './components/VitalSignsByPatient';
import CreateVitalSigns from './components/CreateVitalSigns';
import EmergencyAlertsByPatient from './components/EmergencyAlertsByPatient';
import CreateEmergencyAlert from './components/CreateEmergencyAlert';
import EmergencyAlertList from './components/EmergencyAlerts/EmergencyAlertList';
import EmergencyAlertResponse from './components/EmergencyAlerts/EmergencyAlertResponse';
//
function App() {

  return (
    <div>
      <Router>

        <Switch>

          <Route path="/signUp">
            <SignUp />
          </Route>

          <Route path="/signIn">
            <SignIn />
          </Route>

          <Route path="/home">
            <Home />
          </Route>

          <Route path="/listPatients">
            <ListPatients />
          </Route>

          <Route path="/vitalSignsBypatient/:userId" >
            <VitalSignsByPatient />
          </Route >

          <Route path="/registerVitalSigns/:userId" >
            <CreateVitalSigns />
          </Route >

          <Route path="/emergencyAlertsBypatient/:userId" >
            <EmergencyAlertsByPatient />
          </Route >

          <Route path="/registerEmergencyAlert/:userId" >
            <CreateEmergencyAlert />
          </Route >

          <Route path="/emergencyAlerts">
            <EmergencyAlertList />
          </Route>

          <Route path="/emergencyAlertResponse/:alertId" >
            <EmergencyAlertResponse />
          </Route >
          

          <Route path="/">
            <SignIn />
          </Route>




        </Switch>
        {/* <Header /> */}

      </Router>
    </div>

  );
}

export default App;
