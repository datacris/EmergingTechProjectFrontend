import React, {  useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import '../Styles.css'
import Dashboard from '../Dashboard';
import Spinner from 'react-bootstrap/Spinner';
import { Button } from '@material-ui/core';
import { useStateValue } from '../../providers/StateProvider';
import Axios from 'axios';
import HealingIcon from '@material-ui/icons/Healing';
import Particles from '../Particles';

function ListPatients(props) {

    const [{ endpoint_API }] = useStateValue();

    const [patients, setPatients] = useState([]);
    const [showLoading, setShowLoading] = useState(true);

    const apiUrl = endpoint_API+ "/patients";

    useEffect(() => {
        setShowLoading(true);
        const fetchData = async () => {
            const result = await Axios(apiUrl);
            setPatients((result.data));
            setShowLoading(false);
        };

        fetchData();
    }, []);


    //Call the view for the patient vital signs
    const vitalSigns = (userId) => {
        props.history.push({
            pathname: '/vitalSignsBypatient/' + userId
        });
    }

    return (
        <div>
            < Dashboard title='Patient list' />
            <Particles />

            <div className="container container__custom">

                <section className="jumbotron text-center bg-light p-5 rounded jumbotron__custom">

                    {showLoading &&
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    }
                    <h2 class="jumbotron-heading"> List of patients</h2>

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
                                            size='small'
                                            variant="contained"
                                            color="primary"
                                            startIcon={<HealingIcon />}
                                            onClick={() => { vitalSigns(item._id) }}
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