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
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddIcon from '@material-ui/icons/Add';
//ALERTS by tostify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


function ListStudents(props) {

    const [{ endpoint_API, user }, dispatch] = useStateValue();

    const [data, setData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);

    const apiUrl = endpoint_API + "/students";
    console.log(apiUrl);

    useEffect(() => {
        setShowLoading(true);
        const fetchData = async () => {
            console.log(apiUrl)
            const result = await axios(apiUrl);
            console.log('results from students => ', result.data);

            setData((result.data));
            setShowLoading(false);

        };

        fetchData();
        console.log('*******1')
        console.log(data)
    }, []);




    //Shows course details given an ID
    const showCourses = (id) => {
        props.history.push({
            pathname: '/courseByStudent/' + id
        });
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
                    <h2 class="jumbotron-heading"> List of Students</h2>
                    <p>No student authentication needed here. This is a report section</p>

                    <Table striped bordered hover size="sm">

                        <thead>
                            <tr>
                                <th>Student id</th>
                                <th>Full name</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Program</th>
                                <th>Options</th>

                            </tr>
                        </thead>
                        <tbody>

                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.studentNumber}</td>
                                    <td>{item.fullName}</td>
                                    <td>{item.address}</td>
                                    <td>{item.city}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td>{item.program}</td>
                                    <td>
                                        <Button className='button__custom' variant='info' type='submit'
                                            action onClick={() => { showCourses(item._id) }}>
                                            <AssignmentIcon /> View courses
                                        </Button>

                                    </td>
                                </tr>
                            ))}

                        </tbody>

                    </Table>


                    <div className="buttons__list">

                        <Link to='/Home'>
                            <Button className='button__custom' variant='secondary' type='submit'>Home</Button>
                        </Link>

                    </div>
                </section>

            </div>

        </div>
    )
}

export default withRouter(ListStudents);
