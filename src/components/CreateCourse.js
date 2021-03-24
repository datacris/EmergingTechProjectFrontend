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

function CreateCourse(props) {

    const [{ endpoint_API, user }, dispatch] = useStateValue();

    const [course, setCourse] = useState({
        _id: '',
        courseCode: '',
        courseName: '',
        section: '',
        semester: ''
    });
    const [showLoading, setShowLoading] = useState(false);

    //Getting endpoint from reducer and stateProvider
    const apiUrl = endpoint_API + "/createCourse";
    //const apiUrl = "http://localhost:3000/createCourse";

    const saveCourse = (event) => {
        setShowLoading(true);
        event.preventDefault();
        const data = {
            courseCode: course.courseCode,
            courseName: course.courseName,
            section: course.section,
            semester: course.semester
        };
        axios.post(apiUrl, data)
            .then((result) => {
                setShowLoading(false);
                toast.info('Course Created Successfully!', { position: toast.POSITION.BOTTOM_RIGHT, })
                props.history.push('/showCourse/' + result.data._id)
            }).catch((error) => setShowLoading(false));
    };

    const onChange = (event) => {
        event.persist();
        setCourse({ ...course, [event.target.name]: event.target.value });
    }

    return (
        <div>
            
            <div class="container container__custom">
                <Jumbotron>
                    <Form onSubmit={saveCourse}>

                        <h2 class="jumbotron-heading"> Create a new course</h2>
                        <hr></hr>

                        <Form.Group>
                            <Form.Label> Course Code </Form.Label>
                            <Form.Control type="text" name="courseCode" id="courseCode" placeholder="Enter course code" value={course.courseCode} onChange={onChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Course Name</Form.Label>
                            <Form.Control type="text" name="courseName" id="courseName" placeholder="Enter a course name" value={course.courseName} onChange={onChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Section</Form.Label>
                            <Form.Control type="text" name="section" id="section" placeholder="Enter section" value={course.section} onChange={onChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Semester</Form.Label>
                            <Form.Control type="text" name="semester" id="semester" placeholder="Enter semester" value={course.semester} onChange={onChange} />
                        </Form.Group>
                        <hr></hr>

                        <Button className='button__custom' variant="primary" type="submit">
                            <SaveIcon /> Create
                        </Button>

                        <Link to='/listCourses'>
                            <Button className='button__custom' variant='secondary' >Back to list</Button>
                        </Link>

                    </Form>
                </Jumbotron>
            </div>
        </div>
    );
}

export default withRouter(CreateCourse);
