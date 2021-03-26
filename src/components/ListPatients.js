import React, { Component, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import './Styles.css'
import Dashboard from './Dashboard';
import Spinner from 'react-bootstrap/Spinner';
import { Button, Table } from '@material-ui/core';
import { useStateValue } from '../providers/StateProvider';
import Axios from 'axios';
import HealingIcon from '@material-ui/icons/Healing';

function ListPatients(props) {

    const [{ endpoint_API }, dispatch] = useStateValue();

    const [patients, setPatients] = useState([]);
    const [showLoading, setShowLoading] = useState(true);

    const apiUrl = endpoint_API + "/patients";

    useEffect(() => {
        setShowLoading(true);
        const fetchData = async () => {
            const result = await Axios(apiUrl);
            console.log('results from patient => ', result.data);

            setPatients((result.data));
            setShowLoading(false);
        };

        fetchData();
    }, []);


    //Shows course details given an ID
    const showDetail = (id) => {
        // props.history.push({
        //     pathname: '/showCourse/' + id
        // });
    }

    return (
        <div>
            < Dashboard title='Patient list' />

            <div class="container container__custom">

                <section class="jumbotron text-center bg-light p-5 rounded jumbotron__custom">

                    {showLoading &&
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    }
                    <h2 class="jumbotron-heading"> List of patients</h2>
                    <p>Patients list bla bla bla</p>

                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Full name</th>
                                <th>Email</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>

                            {patients.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.fullName}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<HealingIcon />}
                                            className='button__custom'
                                            onClick={() => { showDetail(item._id) }}
                                        > Vital signs
                                        </Button>
                                        
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>







                </section>

            </div>
        </div>
    );

}

export default withRouter(ListPatients);