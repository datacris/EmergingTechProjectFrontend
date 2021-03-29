
import { withRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../Styles.css'
import Dashboard from '../Dashboard';
import { useStateValue } from '../../providers/StateProvider';
import Axios from 'axios';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import Spinner from 'react-bootstrap/Spinner';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import Moment from 'react-moment';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { readCookie } from '../../providers/reducer';
toast.configure();

function EmergencyAlertResponse(props) {

    const [{ endpoint_API }, dispatch] = useStateValue();

    const apiUrl = endpoint_API + "/responseEmergencyAlert/" + props.match.params.alertId;

    const [emergencyAlert, setEmergencyAlert] = useState([]);

    const [patient, setPatient] = useState([]);

    //To store cookie credentials
    const [userRole, setUserRole] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');

    const [showLoading, setShowLoading] = useState(true);

    const paramsAlertId = props.match.params.alertId;


    useEffect(() => {

        setShowLoading(true);
        getEmergencyAlert(paramsAlertId);

        const getUserInfo = () => {
            readCookie.then((result) => {
                setUserEmail(result.userEmail);
                setUserRole(result.userRole);
                setUserId(result.userId);
            });
        }
        getUserInfo();



        setShowLoading(false);

    }, []);

    //******************************************** */
    //  Get the emergency alert by its Id
    //******************************************** */
    const getEmergencyAlert = async (alertId) => {
        const result = await Axios('/emergencyAlertById/' + alertId);
        setEmergencyAlert(result.data);
        setPatient(result.data.createdBy);
        console.log(result.data)
    }


    //updates the alert message values when changing the values
    const onChange = (event) => {
        event.persist();
        setEmergencyAlert({ ...emergencyAlert, [event.target.name]: event.target.value });
    }

    //*************************** */
    //send response to backend
    //************************** */
    const respondEmergencyAlert = () => {
        setShowLoading(true);

        const data = {
            _id: emergencyAlert._id,
            medicalResponse: emergencyAlert.medicalResponse,
            answeredBy: userId,
        };
        Axios.put(apiUrl, data)
            .then((result) => {
                setShowLoading(false);
                toast.info('Emergency alert has been responded successfully!', { position: toast.POSITION.BOTTOM_RIGHT })
                props.history.push('/emergencyAlerts/')
            }).catch((error) => setShowLoading(false));
    };

    return (
        <div>
            < Dashboard title='Emergency Alert - Response' />

            <div class="container container__custom">
                <section class="jumbotron text-center bg-light p-5 rounded jumbotron__custom">

                    {showLoading &&
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    }
                    <Typography component="h1" variant="h5">
                        Emergency Alert
                    </Typography>

                    <hr></hr>

                    <Grid container spacing={2}>

                        <div class="card mb-3 bg-light border-dark alert_card_response__custom" >
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img
                                        src="https://cdn.shopify.com/s/files/1/2809/4372/products/MEDICAL_ICON_aad3cda6-293e-439c-812c-d4a8bc2252df_1024x1024@2x.png?v=1538711296"
                                        class="card-img alert_image__custom" />

                                </div>
                                <div class="col-md-8 alert_card_content_response__custom">
                                    <div class="card-body">
                                        <h4 class="card-title"><strong>Patient:</strong> {patient.fullName}</h4>
                                        <h4 class="card-title"><strong>Email:</strong> {patient.email}</h4>
                                        <h2 class="card-text">{emergencyAlert.alertMessage}</h2>
                                        <p class="card-text"> Creation date: <Moment format="YYYY-MM-DD HH:mm">{emergencyAlert.creationDate}</Moment></p>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <Grid item xs={12} sm={12} >
                            <TextField
                                autoComplete="medicalResponse"
                                name="medicalResponse"
                                variant="outlined"
                                required
                                fullWidth
                                id="medicalResponse"
                                label="Medical Response"
                                autoFocus
                                value={emergencyAlert.medicalResponse}
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
                        onClick={() => { respondEmergencyAlert() }}
                    >
                        send response
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<ListIcon />}
                        className='button__custom'
                        onClick={() => {
                            props.history.push({
                                pathname: '/emergencyAlerts/'
                            });
                        }}
                    > Back
                    </Button>



                </section>
            </div>
        </div>
    );

}

export default withRouter(EmergencyAlertResponse);