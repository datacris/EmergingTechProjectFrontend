import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Styles.css';
import { useStateValue } from '../providers/StateProvider';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner';

//Material UI COMPONENTS
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
//ALERTS by tostify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


function CoursesByStudent(props) {

    const [{ endpoint_API, user }, dispatch] = useStateValue();

    //To store cookie credentials
    const [student, setStudent] = useState([]);

    const [enrolled, setEnrolled] = useState([]);

    const [showLoading, setShowLoading] = useState(true);

    const paramsStudentId = props.match.params.id


    useEffect(() => {

        setShowLoading(true);
        getCourses(paramsStudentId);
        getStudent(paramsStudentId);

    }, []);

    //******************************************** */
    //Gets courses list
    //******************************************** */
    const getCourses = async (student_id) => {

        //Get enrolled courses by student
        const coursesEnrolledResult = await axios('/coursesByStudent/' + student_id);
        //Assigin sub-array of courses from the logged user
        setEnrolled(coursesEnrolledResult.data[0].courseList);
        console.log('enrolled course');
        console.log(coursesEnrolledResult.data[0].courseList);

    }

    //******************************************** */
    //Get the student
    //******************************************** */
    const getStudent = async (student_id) => {

        const result = await axios('/students/' + student_id);
        setStudent(result.data);
        setShowLoading(false);
    }

    return (
        <div>
            <div class="container container__custom">


                <section class="jumbotron text-center bg-light p-5 rounded">
                    {showLoading &&
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    }
                    <h2 class="jumbotron-heading"> Enrolled Courses for student {student.fullName}</h2>
                    <h4>Student number: ({student.studentNumber}) - {student.email}</h4>

                    <Table striped bordered hover size="sm">

                        <thead>
                            <tr>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Semester</th>
                                <th>Section</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enrolled.length ?
                                enrolled.map((item) => (
                                    // {data.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.courseCode}</td>
                                        <td>{item.courseName}</td>
                                        <td>{item.section}</td>
                                        <td>{item.semester}</td>
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td colspan="5" >
                                        <div class="alert alert-warning" role="alert">
                                            This student has not enrolled courses
                                        </div>
                                    </td>
                                </tr>
                            }

                        </tbody>

                    </Table>

                    <hr></hr>

                    <div className="buttons__list">
                        <Link to='/listStudents'>
                            <Button className='button__custom' variant='secondary' type='submit'>Back to students list</Button>
                        </Link>
                    </div>

                </section>

            </div>

        </div>
    )
}

export default withRouter(CoursesByStudent);
