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
//ALERTS by tostify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


function ListCourses(props) {

    const [{ endpoint_API, user }, dispatch] = useStateValue();

    const [data, setData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);

    const apiUrl = endpoint_API + "/courses";
    console.log(apiUrl);

    useEffect(() => {
        setShowLoading(true);
        const fetchData = async () => {
            const result = await axios(apiUrl);
            console.log('results from courses => ', result.data);

            setData((result.data));
            setShowLoading(false);
        };

        fetchData();
    }, []);


    const updateCourse = (id) => {
        props.history.push({
            pathname: '/editCourse/' + id
        });
    }

    //Shows course details given an ID
    const showDetail = (id) => {
        props.history.push({
            pathname: '/showCourse/' + id
        });
    }

    //Delete a course by a given Id
    const deleteCourse = (id) => {
        //var x = document.getElementById(id);
        setShowLoading(true);

        const apiUrlEvent = endpoint_API + "/courses/" + id;

        axios.delete(apiUrlEvent, id)
            .then((result) => {
                setShowLoading(false);
                //props.history.push('/listCourses')  //In case of rendering a differente component
                console.log('data filter')
                console.log(data)
                const newList = data.filter((item) => item._id !== id);
                setData(newList);

                toast.info('Course Deleted!', { position: toast.POSITION.BOTTOM_RIGHT })

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
                    <h2 class="jumbotron-heading"> List of courses</h2>
                    <p>No student authentication needed here. Courses are handled by administrator as well as reports</p>

                    <Link to='/createCourse'>
                        <Button className='button__custom buttons__list' variant="primary" type="submit">
                            <AddIcon />Add new course
                        </Button>
                    </Link>


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

                            {data.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.courseCode}</td>
                                    <td>{item.courseName}</td>
                                    <td>{item.section}</td>
                                    <td>{item.semester}</td>
                                    <td>
                                        <Button className='button__custom' variant='info' type='submit'
                                            action onClick={() => { showDetail(item._id) }}>
                                            <ListAltIcon /> Details
                                        </Button>
                                        <Button className='button__custom' variant='secondary' type='submit'
                                            onClick={() => { updateCourse(item._id) }}>
                                            <EditOutlinedIcon /> Edit
                                        </Button>
                                        <Button className='button__custom' variant='danger' type='submit'
                                            onClick={() => { deleteCourse(item._id) }}>
                                            <DeleteForeverOutlinedIcon /> Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>

                    </Table>


                    <div className="buttons__list">
                        <Link to='/createCourse'>
                            <Button className='button__custom' variant="primary" type="submit">
                                <AddIcon />Add new course</Button>
                        </Link>

                        <Link to='/Home'>
                            <Button className='button__custom' variant='secondary' type='submit'>Home</Button>
                        </Link>

                    </div>
                </section>

            </div>

        </div>
    )
}

export default withRouter(ListCourses);
