
import { withRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../Styles.css'
import Dashboard from '../Dashboard';
import Axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import {  Typography } from '@material-ui/core';

import EmergencyAlert from './EmergencyAlert';
import Particles from '../Particles';

function EmergencyAlertList(props) {
    
    const [emergencyAlerts, setEmergencyAlerts] = useState([]);

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
            <Particles />

            <div className="container container__custom">

                <section className="jumbotron text-center bg-light p-5 rounded jumbotron__custom">

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