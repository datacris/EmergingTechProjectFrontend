
import { withRouter } from 'react-router-dom';
import React, { Component, useEffect, useState } from 'react';
import '../Styles.css'
import Dashboard from '../Dashboard';
import { useStateValue } from '../../providers/StateProvider';
import Axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { Button, Typography } from '@material-ui/core';
import { readCookie } from "../../providers/reducer"

import EmergencyAlert from './EmergencyAlert';

function EmergencyAlertList(props) {

    const [{ endpoint_API }, dispatch] = useStateValue();

    const [emergencyAlerts, setEmergencyAlerts] = useState([]);

    const [patient, setPatient] = useState([]);

    const [showLoading, setShowLoading] = useState(true);


    useEffect(() => {

        setShowLoading(true);
        getEmergencyAlerts();

        setShowLoading(false);

    }, []);


    //******************************************** */
    //Gets emergency alerts
    //******************************************** */
    const getEmergencyAlerts = async () => {

        //Get emergency alerts 
        const res = await Axios('/emergencyAlertsList/');
        setEmergencyAlerts(res.data);
    }

    //Call the view for register vital signs to parient by Id
    // const addEmegencyAlert = (userId) => {
    //     props.history.push({
    //         pathname: '/registerEmergencyAlert/' + userId
    //     });
    // }

    return (
        <div>
            < Dashboard title='Emergency Alerts' />

            <div class="container container__custom">

                <section class="jumbotron text-center bg-light p-5 rounded jumbotron__custom">

                    {showLoading &&
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    }

                    <Typography component="h1" variant="h5">
                        Emergency Alerts
                    </Typography>
                    <hr></hr>

                    {emergencyAlerts.map((item) => (
                        <EmergencyAlert
                            key={item._id}
                            _id={item._id}
                            alertMessage={item.alertMessage}
                            medicalResponse={item.medicalResponse}
                            alertState={item.alertState}
                            createdBy={item.createdBy}
                            answeredBy={item.answeredBy}
                            creationDate={item.creationDate}
                            answerDate={item.answerDate}
                        />
                    ))}

                    <hr></hr>

                </section>

            </div>
        </div>
    );

}

export default withRouter(EmergencyAlertList);