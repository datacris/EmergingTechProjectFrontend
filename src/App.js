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
//
function App() {

  return (
    <div>
        <Header />      
    </div>

  );
}

export default App;
