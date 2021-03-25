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

          <Route path="/listCourses">
            <ListCourses />
          </Route>

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
