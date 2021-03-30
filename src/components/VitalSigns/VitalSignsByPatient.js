
import { withRouter } from 'react-router-dom';
import React, {  useEffect, useState } from 'react';
import '../Styles.css'
import Dashboard from '../Dashboard';
import Axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

function VitalSignsByPatient(props) {

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
        setVitalSigns(res.data);
    }

    //Call the view for register vital signs to parient by Id
    const addVitalSigns = (userId) => {
        props.history.push({
            pathname: '/registerVitalSigns/' + userId
        });
    }

    return (
        <div>
            < Dashboard title='Vital Signs' />

            <div className="container container__custom">

                <section className="jumbotron text-center bg-light p-5 rounded jumbotron__custom">

                    {showLoading &&
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    }
                    
                   
                    <Typography component="h1" variant="h5">
                    Vital Signs - Patient: {patient.fullName}
                    </Typography>
                    <p>The four main vital signs routinely monitored by medical professionals and health care providers:</p>


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
                        onClick={() => { addVitalSigns(paramsUsertId) }}
                    > Register vital signs
                    </Button>


                </section>

            </div>
        </div>
    );

}

export default withRouter(VitalSignsByPatient);