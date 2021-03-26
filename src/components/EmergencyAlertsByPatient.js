
import { withRouter } from 'react-router-dom';
import React, { Component, useEffect, useState } from 'react';
import './Styles.css'
import Dashboard from './Dashboard';
import { useStateValue } from '../providers/StateProvider';
import Axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

function EmergencyAlertsByPatient(props) {

    const [{ endpoint_API }, dispatch] = useStateValue();

    const [vitalSigns, setVitalSigns] = useState([]);

    const [patient, setPatient] = useState([]);

    const [showLoading, setShowLoading] = useState(true);

    const paramsUsertId = props.match.params.userId



    useEffect(() => {

        setShowLoading(true);
        getVitalSigns(paramsUsertId);
        getPatient(paramsUsertId);

        setShowLoading(false);

    }, []);


    //******************************************** */
    //  Get the patient 
    //******************************************** */
    const getPatient = async (userId) => {
        const result = await Axios('/user/' + userId);
        setPatient(result.data);
    }

    //******************************************** */
    //Gets patien's vital signs
    //******************************************** */
    const getVitalSigns = async (userId) => {

        //Get vital signs by patient
        const res = await Axios('/vitalSignsBypatient/' + userId);
        console.log('********234')
        console.log(res.data)
        setVitalSigns(res.data);
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

            <div class="container container__custom">

                <section class="jumbotron text-center bg-light p-5 rounded jumbotron__custom">

                    {showLoading &&
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    }
                    
                   
                    <Typography component="h1" variant="h5">
                    Emergency Alerts - Patient: {patient.fullName}
                    </Typography>


                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Body Temperature</th>
                                <th>Heart Rate</th>
                                <th>Blood Pressure</th>
                                <th>Respiratory Rate</th>
                                <th>Created By</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>

                            {vitalSigns.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.bodyTemperature}</td>
                                    <td>{item.heartRate}</td>
                                    <td>{item.bloodPressure}</td>
                                    <td>{item.respiratoryRate}</td>
                                    <td>{item.createdBy.userType === 'nurse' ? 'Nurse. ' + item.createdBy.fullName : item.createdBy.fullName}</td>
                                    <td>{item.date}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

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