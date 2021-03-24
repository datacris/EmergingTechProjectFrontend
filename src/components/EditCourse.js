import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, withRouter } from 'react-router-dom';
import { useStateValue } from '../providers/StateProvider';

import SaveIcon from '@material-ui/icons/Save';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


function EditCourse(props) {

    const [course, setCourse] = useState({ _id: '', courseCode: '', courseName: '', section: '', semester: '' });
    const [showLoading, setShowLoading] = useState(true);
    const [{ endpoint_API, user }, dispatch] = useStateValue();

    const apiUrl = endpoint_API + "/courses/" + props.match.params.id;


    //runs only once after the first render
    useEffect(() => {
        setShowLoading(false);
        //call api
        const fetchData = async () => {
            const result = await axios(apiUrl);
            setCourse(result.data);
            console.log(result.data);
            setShowLoading(false);
        };
        fetchData();
    }, []);

    const updateCourse = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {
            _id: course._id,
            courseCode: course.courseCode,
            courseName: course.courseName,
            section: course.section,
            semester: course.semester
        };
        axios.put(apiUrl, data)
            .then((result) => {
                setShowLoading(false);
                toast.info('Course Updated Successfully!', { position: toast.POSITION.BOTTOM_RIGHT })
                props.history.push('/showCourse/' + result.data._id)
            }).catch((error) => setShowLoading(false));
    };


    //runs when user enters a field
    const onChange = (e) => {
        e.persist();
        setCourse({ ...course, [e.target.name]: e.target.value });
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
                    <h1 class="jumbotron-heading"> Edit Course</h1>
                    <hr></hr>

                    <Form onSubmit={updateCourse}>
                        <Form.Group>
                            <Form.Control type="hidden" name="_id" id="_id" value={course.course_id} />
                        </Form.Group>
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

                        <Button variant="primary" type="submit">
                            <SaveIcon /> Save
                        </Button>

                        <Link to='/home'>
                            <Button className='button__custom' variant='secondary'>Back</Button>
                        </Link>
                    </Form>
                </Jumbotron>
            </div>
        </div>
    );
}

export default withRouter(EditCourse);
