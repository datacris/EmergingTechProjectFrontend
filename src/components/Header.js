import React, { useState, useEffect } from 'react';
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
import './Styles.css'
//import './App.css';



//import CreateUser from './components/CreateUser';
import Home from './Home';
import Login from './Login';
import ListCourses from './ListCourses';
import CreateCourse from './CreateCourse';
import ShowCourse from './ShowCourse';
import EditCourse from './EditCourse';
import CreateStudent from './CreateStudent';
import ShowStudent from './ShowStudent';
import StudentCourses from './StudentCourses';
import Axios from 'axios';
import ListStudents from './ListStudents';
import CoursesByStudent from './CoursesByStudent';


function Header() {

    //state variable for the screen, admin or user
    const [screen, setScreen] = useState('auth');


    useEffect(() => {
        readCookie();
    }, []);



    //check if the user already logged-in
    const readCookie = async () => {
        try {
            console.log('--- in readCookie function ---');

            //
            const res = await Axios.get('/read_cookie');
            // 
            if (res.data.screen !== undefined) {
                setScreen(res.data.screen);
                console.log(res.data.screen)
            }
        } catch (e) {
            setScreen('auth');
            console.log(e);
        }
    };

    // called when user clicks on Logout button
    // to clear the cookie and set the screen state variable 
    // back to its initial state.
    const deleteCookie = async () => {
        try {
            await Axios.get('/signout');
            setScreen('auth');

        } catch (e) {
            console.log(e);
        }
    };


    return (
        <Router>
            <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        {/* <Nav.Link href="/login">Login</Nav.Link> */}


                        <Nav.Link href="/listCourses">Courses</Nav.Link>
                        <Nav.Link href="/listStudents">Students</Nav.Link>

                        {screen === 'auth' ?
                            <div className='header__custom'>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/studentSignUp">Student Sign Up</Nav.Link>
                            </div>
                            :
                            <div className='header__custom'>
                                <Nav.Link href="/studentCourses">My Courses</Nav.Link>
                                <Nav.Link onClick={deleteCookie}>Logout</Nav.Link>
                                <p> Student account: ({screen})</p>
                            </div>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div>
                <Route render={() => < Home />} path="/home" />
                <Route render={() => < Login />} path="/login" />

                <Route render={() => < ListCourses />} path="/listCourses" />
                <Route render={() => < ListStudents />} path="/listStudents" />
                <Route render={() => < CreateCourse />} path="/createCourse" />
                <Route render={() => < ShowCourse />} path="/showCourse/:id" />
                <Route render={() => < EditCourse />} path="/editCourse/:id" />
                <Route render={() => < CreateStudent />} path="/studentSignUp" />
                <Route render={() => < ShowStudent />} path="/showStudent/:id" />
                <Route render={() => < StudentCourses />} path="/studentCourses" />
                <Route render={() => < CoursesByStudent />} path="/courseByStudent/:id" />

                


            </div>

        </Router>
    )
}

export default Header
