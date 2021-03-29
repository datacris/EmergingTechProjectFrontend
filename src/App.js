import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Home from './components/Home';
import About from './components/About';
import EmergencyAlertList from './components/EmergencyAlerts/EmergencyAlertList';
import EmergencyAlertResponse from './components/EmergencyAlerts/EmergencyAlertResponse';
import EmergencyAlertsByPatient from './components/EmergencyAlerts/EmergencyAlertsByPatient';
import CreateVitalSigns from './components/VitalSigns/CreateVitalSigns';
import VitalSignsByPatient from './components/VitalSigns/VitalSignsByPatient';
import SignUp from './components/Authentication/SignUp';
import SignIn from './components/Authentication/SignIn';
import CreateEmergencyAlert from './components/EmergencyAlerts/CreateEmergencyAlert';
import ListPatients from './components/Patients/ListPatients';
import MotivationalMessagesList from './components/MotivationalMessages/MotivationalMessagesList';
import CreateMotivationalMessage from './components/MotivationalMessages/CreateMotivationalMessage';
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

          <Route path="/about">
            <About />
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

          <Route path="/motivationalMessages" >
            <MotivationalMessagesList />
          </Route >
          
          <Route path="/createMotivationalMessage" >
            <CreateMotivationalMessage />
          </Route >          

          <Route path="/">
            <SignIn />
          </Route>

        </Switch>

      </Router>
    </div>

  );
}

export default App;
