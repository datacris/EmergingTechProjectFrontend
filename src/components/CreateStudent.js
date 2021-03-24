import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, withRouter } from 'react-router-dom';
import './Styles.css';
import { useStateValue } from '../providers/StateProvider';

import SaveIcon from '@material-ui/icons/Save';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function CreateStudent(props) {

    const [{ endpoint_API, user }, dispatch] = useStateValue();

    const [student, setStudent] = useState({
        _id: '',
        studentNumber: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        phone: '',
        email: '',
        program: ''
    });
    const [showLoading, setShowLoading] = useState(false);

    //Getting FRONT endpoint from reducer and stateProvider
    const apiUrl = endpoint_API + "/createStudent";

    const saveStudent = (event) => {
        setShowLoading(true);
        event.preventDefault();
        const data = {
            studentNumber: student.studentNumber,
            password: student.password,
            firstName: student.firstName,
            lastName: student.lastName,
            address: student.address,
            city: student.city,
            phone: student.phone,
            email: student.email,
            program: student.program
        };
        console.log(apiUrl);
        console.log(data);
        axios.post(apiUrl, data)
            .then((result) => {
                setShowLoading(false);
                toast.info('Student Created Successfully!', { position: toast.POSITION.BOTTOM_RIGHT,  })
                props.history.push('/showStudent/' + result.data._id)
            }).catch((error) => {
                toast.error('Error '+ error, { position: toast.POSITION.BOTTOM_RIGHT,  });
                setShowLoading(false);
            })
    };

    const onChange = (event) => {
        event.persist();
        setStudent({ ...student, [event.target.name]: event.target.value });
    }

    return (
        <div>
            {showLoading &&
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            }
            <div class="container container__custom">
                <Jumbotron>
                    <Form onSubmit={saveStudent}>

                        <h2 class="jumbotron-heading"> Student Sign Up </h2>
                        <hr></hr>

                        <Form.Group>
                            <Form.Label> Student Number </Form.Label>
                            <Form.Control type="text" name="studentNumber" id="studentNumber" placeholder="Student Number" value={student.studentNumber} onChange={onChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Password</Form.Label>
                            <Form.Control type="password" name="password" id="password" placeholder="Set a password" value={student.password} onChange={onChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> first Name</Form.Label>
                            <Form.Control type="text" name="firstName" id="secfirstNametion" placeholder="Enter First Name" value={student.firstName} onChange={onChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Last Name</Form.Label>
                            <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter last name" value={student.lastName} onChange={onChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Address</Form.Label>
                            <Form.Control type="text" name="address" id="address" placeholder="Enter address" value={student.address} onChange={onChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> City</Form.Label>
                            <Form.Control type="text" name="city" id="city" placeholder="Enter city" value={student.city} onChange={onChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Phone</Form.Label>
                            <Form.Control type="text" name="phone" id="phone" placeholder="Enter phone" value={student.phone} onChange={onChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> E-mail</Form.Label>
                            <Form.Control type="text" name="email" id="email" placeholder="Enter email" value={student.email} onChange={onChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Program</Form.Label>
                            <Form.Control type="text" name="program" id="program" placeholder="Enter program" value={student.program} onChange={onChange} />
                        </Form.Group>
    
   
                        <hr></hr>

                        <Button className='button__custom' variant="success" type="submit">
                            <SaveIcon /> Sign-Up
                        </Button>

                        <Link to='/Home'>
                            <Button className='button__custom' variant='secondary' >Home</Button>
                        </Link>

                    </Form>
                </Jumbotron>
            </div>
        </div>
    );
}

export default withRouter(CreateStudent);
