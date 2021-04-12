import { withRouter } from 'react-router-dom';
import React, {  useEffect, useState } from 'react';
import '../Styles.css'
import Dashboard from '../Dashboard';
import Axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EmergencyAlert from './EmergencyAlert';
import { readCookie } from '../../providers/reducer';
import Particles from '../Particles';

function EmergencyAlertsByPatient(props) {

    const [emergencyAlerts, setEmergencyAlerts] = useState([]);

    const [patient, setPatient] = useState([]);

    const [showLoading, setShowLoading] = useState(true);

    const paramsUsertId = props.match.params.userId

    //To store cookie credentials
    // const [userRole, setUserRole] = useState('');
    // const [userEmail, setUserEmail] = useState('');
    // const [userId, setUserId] = useState('');


    useEffect(() => {

        setShowLoading(true);
        getEmergencyAlerts(paramsUsertId);
        getPatient(paramsUsertId);
        setShowLoading(false);

        const getUserInfo =() => {
            readCookie.then((result) => {
                // setUserEmail(result.userEmail);
                // setUserRole(result.userRole);
                // setUserId(result.userId);
            });
        }   
        getUserInfo();

    }, []);


    //******************************************** */
    //  Get the patient 
    //******************************************** */
    const getPatient = async (userId) => {
        const result = await Axios('/user/' + userId);
        setPatient(result.data);
    }

    //******************************************** */
    //Gets patien's emergency alerts
    //******************************************** */
    const getEmergencyAlerts = async (userId) => {

        //Get emergency alerts by patient
        const res = await Axios('/emergencyAlertsBypatient/' + userId);
        setEmergencyAlerts(res.data);
    }

    //Call the view for register vital signs to parient by Id
    const addEmegencyAlert = (userId) => {
        props.history.push({
            pathname: '/registerEmergencyAlert/' + userId
        });
    }

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
                        Emergency Alerts - Patient: {patient.fullName}
                    </Typography>
                    <hr></hr>

                    {emergencyAlerts.map((item) => (
                        <EmergencyAlert
                            key={item._id}
                            id={item._id}
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

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        className='button__custom'
                        onClick={() => { addEmegencyAlert(paramsUsertId) }}
                    > create emergency alert
                    </Button>


                </section>

            </div>
        </div>
    );

}

export default withRouter(EmergencyAlertsByPatient);