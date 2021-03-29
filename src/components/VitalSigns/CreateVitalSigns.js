
import { withRouter } from 'react-router-dom';
import React, { Component, useEffect, useState } from 'react';
import '../Styles.css'
import Dashboard from '../Dashboard';
import Axios from 'axios';
import { Avatar, Button, Grid, TextField, Typography } from '@material-ui/core';
import Spinner from 'react-bootstrap/Spinner';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStateValue } from '../../providers/StateProvider';
toast.configure();

function CreateVitalSigns(props) {

    const [{ endpoint_API }, dispatch] = useStateValue();

    const apiUrl =  "/registerVitalSigns";

    const [patient, setPatient] = useState([]);

    const [creator, setCreator] = useState([]);

    const [showLoading, setShowLoading] = useState(true);

    const paramsUsertId = props.match.params.userId;

    //Initializing user to get and set values by using onchange event
    const [vitalSigns, setVitalSigns] = useState({
        _id: '',
        bodyTemperature: '',
        heartRate: '',
        bloodPressure: '',
        respiratoryRate: '',
        patient: '',
        createdBy: ''
    });

    useEffect(() => {

        setShowLoading(true);

        readCookie();

        getPatient(paramsUsertId);

        setShowLoading(false);

    }, []);

    //******************************************** */
    //Get the patient 
    //******************************************** */
    const getPatient = async (userId) => {
        const result = await Axios('/user/' + userId);
        setPatient(result.data);
    }

    /******************************************** */
    //Get the creator 
    //******************************************** */
    const getCreatorUser = async (userId) => {
        const result = await Axios('/user/' + userId);
        setCreator(result.data);
    }

    //******************************************* */
    //Reads the cookie to get user info
    const readCookie = async () => {
        try {
            const res = await Axios.get('/read_cookie');
            if (res.data.userEmail !== '') {
                // setUserEmail(res.data.userEmail);
                // setUserRole(res.data.userRole);                
                getCreatorUser(res.data.userId);
            }
        } catch (e) {
            props.history.push('/SignIn')
            console.log(e);
        }
    };

    //updates the vital sign values when changing the values
    const onChange = (event) => {
        event.persist();
        setVitalSigns({ ...vitalSigns, [event.target.name]: event.target.value });
    }

    //Creates vital signs consuming backend services
    const registerVitalSigns = () => {

        const data = {
            bodyTemperature: vitalSigns.bodyTemperature,
            heartRate: vitalSigns.heartRate,
            bloodPressure: vitalSigns.bloodPressure,
            respiratoryRate: vitalSigns.respiratoryRate,
            patient: patient,
            createdBy: creator
        };

        console.log(apiUrl);
        Axios.post(apiUrl, data)
            .then((result) => {
                setShowLoading(true);
                toast.info('Vital signs created successfully!', { position: toast.POSITION.BOTTOM_RIGHT, })
                setTimeout(function () {
                    props.history.push({
                        pathname: '/vitalSignsBypatient/' + paramsUsertId
                    });
                }, 1000);
            }).catch((error) => {
                toast.error('Error ' + error, { position: toast.POSITION.BOTTOM_RIGHT, });
            })
    };

    return (
        <div>
            < Dashboard title='Register Vital Signs' />

            <div class="container container__custom">
                <section class="jumbotron text-center bg-light p-5 rounded jumbotron__custom">

                    {showLoading &&
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    }
                    <Typography component="h1" variant="h5">
                        Register new Vital Signs
                    </Typography>

                    <hr></hr>                    

                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="bodyTemperature"
                                name="bodyTemperature"
                                variant="outlined"
                                required
                                fullWidth
                                id="bodyTemperature"
                                label="Body Temperature"
                                autoFocus
                                value={vitalSigns.bodyTemperature}
                                onChange={onChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="heartRate"
                                label="Heart Rate"
                                name="heartRate"
                                autoComplete="heartRate"
                                value={vitalSigns.heartRate}
                                onChange={onChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="bloodPressure"
                                label="Blood Pressure"
                                name="bloodPressure"
                                autoComplete="bloodPressure"
                                value={vitalSigns.bloodPressure}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="respiratoryRate"
                                label="Respiratory Rate"
                                id="respiratoryRate"
                                autoComplete="respiratoryRate"
                                value={vitalSigns.respiratoryRate}
                                onChange={onChange}
                            />
                        </Grid>
                    </Grid>

                    <hr></hr>   

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className='button__custom'
                        startIcon={<AddIcon />}
                        onClick={() => { registerVitalSigns() }}
                    >
                        Register
                    </Button>
                    
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<ListIcon />}
                        className='button__custom'
                        onClick={() => { 
                            props.history.push({
                                pathname: '/vitalSignsBypatient/' + paramsUsertId
                            });
                         }}
                    > Back to list
                    </Button>
                    


                </section>
            </div>
        </div>
    );

}

export default withRouter(CreateVitalSigns);