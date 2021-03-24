import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { Link, withRouter } from 'react-router-dom';
import { useStateValue } from '../providers/StateProvider';
import AddIcon from '@material-ui/icons/Add';

function ShowCourse(props) {

    const [{ endpoint_API, user }, dispatch] = useStateValue();

    const [data, setData] = useState({});
    const [showLoading, setShowLoading] = useState(true);
    const apiUrl = endpoint_API + "/courses/" + props.match.params.id;
    //console.log(apiUrl)

    useEffect(() => {
        setShowLoading(false);
        const fetchData = async () => {
            const result = await axios(apiUrl);
            console.log('results from courses => ', result.data);

            setData(result.data);
            setShowLoading(false);
        };

        fetchData();
    }, []);


    return (

        <div>
            {showLoading && <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>}

            <div class="container container__custom">

                <Jumbotron>
                    <h1 class="jumbotron-heading"> Course Details</h1>
                    <hr></hr>
                    <h3>Course Code: {data.courseCode}</h3>
                    <h3>Course Name: {data.courseName}</h3>
                    <h3>Section: {data.section}</h3>
                    <h3>Semester: {data.semester}</h3>
                    <hr></hr>

                    <Link to='/createCourse'>
                        <Button className='button__custom' variant="primary" type="submit">
                            <AddIcon /> Add new course
                        </Button>
                    </Link>
                    <Link to='/listCourses'>
                        <Button className='button__custom' variant='secondary' type='submit'>List Courses</Button>
                    </Link>
                    
                    <Link to='/home'>
                        <Button className='button__custom' variant='secondary' type='submit'>Home</Button>
                    </Link>
                    
                </Jumbotron>
            </div>
        </div>
    );
}

export default withRouter(ShowCourse);
