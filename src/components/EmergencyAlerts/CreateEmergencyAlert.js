
import { withRouter } from 'react-router-dom';
import React, {  useEffect, useState } from 'react';
import '../Styles.css'
import Dashboard from '../Dashboard';
import { useStateValue } from '../../providers/StateProvider';
import Axios from 'axios';
import {  Button, Grid, TextField, Typography } from '@material-ui/core';
import Spinner from 'react-bootstrap/Spinner';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Particles from '../Particles';
toast.configure();

function CreateEmergencyAlert(props) {

    const [{ endpoint_API }] = useStateValue();

    const apiUrl = endpoint_API+ "/registerEmergencyAlert";

    const [creator, setCreator] = useState([]);

    const [showLoading, setShowLoading] = useState(true);

    const paramsUsertId = props.match.params.userId;

    //Initializing user to get and set values by using onchange event
    const [emergencyAlert, setEmergencyAlert] = useState({
        _id: '',
        alertMessage: 'Default message - I need help ASAP',
        createdBy: ''
    });

    useEffect(() => {

        setShowLoading(true);
        
        const readCookie = async (props) => {
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

        readCookie();

        setShowLoading(false);

    }, []);

    /******************************************** */
    //Get the creator 
    //******************************************** */
    const getCreatorUser = async (userId) => {
        const result = await Axios('/user/' + userId);
        setCreator(result.data);
    }

    //******************************************* */
    //Reads the cookie to get user info
    

    //updates the alert message values when changing the values
    const onChange = (event) => {
        event.persist();
        setEmergencyAlert({ ...emergencyAlert, [event.target.name]: event.target.value });
    }

    //Creates amergency alert consuming backend services
    const registerAlert = () => {

        const data = {
            alertMessage: emergencyAlert.alertMessage,
            createdBy: creator
        };

        Axios.post(apiUrl, data)
            .then((result) => {
                setShowLoading(true);
                toast.info('Emergency alert created successfully!', { position: toast.POSITION.BOTTOM_RIGHT, })
                setTimeout(function () {
                    props.history.push({
                        pathname: '/emergencyAlertsBypatient/' + paramsUsertId
                      });
                }, 1000);
            }).catch((error) => {
                toast.error('Error ' + error, { position: toast.POSITION.BOTTOM_RIGHT, });
            })
    };

    return (
        <div>
            < Dashboard title='Register Vital Signs' />
            <Particles />

            <div className="container container__custom">
                <section className="jumbotron text-center bg-light p-5 rounded jumbotron__custom">

                    {showLoading &&
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    }
                    <Typography component="h1" variant="h5">
                        Create new Emergency Alert
                    </Typography>

                    <hr></hr>                    

                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={12} >
                            <TextField
                                autoComplete="alertMessage"
                                name="alertMessage"
                                variant="outlined"
                                required
                                fullWidth
                                id="alertMessage"
                                label="Alert message"
                                autoFocus
                                value={emergencyAlert.alertMessage}
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
                        onClick={() => { registerAlert() }}
                    >
                        send alert
                    </Button>
                    
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<ListIcon />}
                        className='button__custom'
                        onClick={() => {
                            props.history.push({
                              pathname: '/emergencyAlertsBypatient/' + paramsUsertId
                            });
                          }} 
                    > Back
                    </Button>
                    


                </section>
            </div>
        </div>
    );

}

export default withRouter(CreateEmergencyAlert);