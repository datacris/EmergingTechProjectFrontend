import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { Link, withRouter } from 'react-router-dom';
import { useStateValue } from '../providers/StateProvider';
import AddIcon from '@material-ui/icons/Add';

function ShowStudent(props) {

    const [{ endpoint_API, user }, dispatch] = useStateValue();

    const [data, setData] = useState({});
    const [showLoading, setShowLoading] = useState(true);
    const apiUrl = endpoint_API + "/students/" + props.match.params.id;
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
                    <h1 class="jumbotron-heading"> Student Details</h1>
                    <hr></hr>
                    <h3>First Name: {data.firstName}</h3>
                    <h3>Last Name: {data.lastName}</h3>
                    <h3>City: {data.city}</h3>
                    <h3>Address: {data.address}</h3>
                    <h3>Phone: {data.phone}</h3>
                    <h3>E-mail: {data.email}</h3>
                    <hr></hr>                  
    
                    <Link to='/home'>
                        <Button className='button__custom' variant='secondary' type='submit'>Home</Button>
                    </Link>
                    
                </Jumbotron>
            </div>
        </div>
    );
}

export default withRouter(ShowStudent);
