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


function StudentCourses(props) {

    const [{ endpoint_API, user }, dispatch] = useStateValue();

    //To store cookie credentials
    const [screen, setScreen] = useState('auth');
    const [studentId, setStudentId] = useState('');

    const [data, setData] = useState([]);
    const [enrolled, setEnrolled] = useState([]);
    const [toEnroll, setToEnroll] = useState([]);


    const [showLoading, setShowLoading] = useState(true);

    const apiUrl = endpoint_API + "/courses";



    useEffect(() => {

        readCookie();
        setShowLoading(true);
        // const fetchData = async () => {
        //     const result = await axios(apiUrl);
        //     console.log('results from courses => ', result.data);
        //     console.log('course list DATA')
        //     setData((result.data));
        //     setShowLoading(false);
        // };

        //fetchData();

    }, []);

    //check if the user already logged-in
    const readCookie = async () => {
        try {
            console.log('--- in readCookie function ---');

            const res = await axios.get('/read_cookie');
            // 
            if (res.data.screen !== undefined) {
                setScreen(res.data.screen);
                console.log('StudentNumber: ' + res.data.screen)
                setStudentId(res.data.userId)
                console.log('StudentId: ' + res.data.userId)
                getCourses(res.data.userId);
            }

        } catch (e) {
            setScreen('auth');
            console.log(e);
        }
    };

    //******************************************** */
    //Gets two courses list, enrolled and available
    //******************************************** */
    const getCourses = async (student_id) => {

        //Get enrolled courses by student
        const coursesEnrolledResult = await axios('/coursesByStudent/' + student_id);
        //Assigin sub-array of courses from the logged user
        setEnrolled(coursesEnrolledResult.data[0].courseList)
        console.log('enrolled course')
        console.log(coursesEnrolledResult.data[0].courseList)

        //Get available courses to be enrolled by student
        const coursesAvailableToEnrollResult = await axios('/coursesAvailablesByStudent/' + student_id);
        setData(coursesAvailableToEnrollResult.data)
        console.log('enrolled course')

        setShowLoading(false);

    }

    //******************************************** */
    //Updates the ACTIVE COURSES courses table
    //******************************************** */
    const moveCourseToTable = (courseId, type) => {

        const apiUrlReq = endpoint_API + "/courses/" + courseId;
        const fetchData = async () => {
            const result = await axios(apiUrlReq);

            if (type == 'ACTIVE_COURSES') {
                setEnrolled(enrolled => [...enrolled, result.data])

                //Removing course from the ENROLLED SECTION
                const newListAvailable = data.filter((item) => item._id !== courseId);
                setData(newListAvailable);
            }

            if (type == 'ENROLL_SECTION') {
                setData(data => [...data, result.data])

                //Removing course from the ENROLLED SECTION
                const newListAvailable = enrolled.filter((item) => item._id !== courseId);
                setEnrolled(newListAvailable);
            }
        };
        fetchData();
    }


    //******************************************** */
    //Updates the ACTIVE COURSES courses table
    //******************************************** */
    const enroll = (courseId) => {

        setShowLoading(true);

        const req = {
            course: courseId,
            student: screen
        };
        const apiUrlReq = endpoint_API + "/enrollCourse";

        axios.put(apiUrlReq, req)
            .then((result) => {
                setShowLoading(false);
                console.log('data filter')
                console.log(data)

                //Moving course from ENROLL SECTION to ACTIVE SECTION 
                moveCourseToTable(courseId, 'ACTIVE_COURSES');

                toast.info('Course Enrolled Successfully!', { position: toast.POSITION.BOTTOM_RIGHT })

                setShowLoading(false);

            }).catch((error) => setShowLoading(false));
    }

    //******************************************** */
    //Drop courses, and set the dropped course as an available
    //******************************************** */
    const drop = (courseId) => {

        setShowLoading(true);

        const req = {
            course: courseId,
            student: screen
        };
        const apiUrlReq = endpoint_API + "/dropCourse";

        axios.put(apiUrlReq, req)
            .then((result) => {

                //Moving course from ACTIVE SECTION to ENROLL SECTION
                moveCourseToTable(courseId, 'ENROLL_SECTION');

                toast.info('Course Dropped Successfully!', { position: toast.POSITION.BOTTOM_RIGHT })

                setShowLoading(false);

            }).catch((error) => setShowLoading(false));

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
                    <h2 class="jumbotron-heading"> My Courses</h2>
                    <p>Students can enroll and drop courses here</p>
                    <hr></hr>
                    <h3>Active Courses</h3>
                    <Table striped bordered hover size="sm">

                        <thead>
                            <tr>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Semester</th>
                                <th>Section</th>
                                <th>Options</th>
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
                                        <td>
                                            <Button className='button__custom' variant='warning' type='submit'
                                                action onClick={() => { drop(item._id) }}>
                                                <HighlightOffIcon /> Drop
                                        </Button>
                                        </td>
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
                    <h3>Enroll section</h3>
                    <hr></hr>

                    <Table striped bordered hover size="sm">

                        <thead>
                            <tr>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Semester</th>
                                <th>Section</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>

                            {data.length ?
                                data.map((item) => (

                                    <tr key={item._id}>
                                        <td>{item.courseCode}</td>
                                        <td>{item.courseName}</td>
                                        <td>{item.section}</td>
                                        <td>{item.semester}</td>
                                        <td>
                                            <Button className='button__custom' variant='info' type='submit'
                                                action onClick={() => { enroll(item._id) }}>
                                                <ListAltIcon /> Enroll
                                        </Button>
                                        </td>
                                    </tr>
                                ))

                                :
                                <tr>
                                    <td colspan="5" >
                                        <div class="alert alert-warning" role="alert">
                                            There is not available courses to enroll
                                </div>
                                    </td>
                                </tr>
                            }

                        </tbody>

                    </Table>



                </section>

            </div>

        </div>
    )
}

export default withRouter(StudentCourses);
