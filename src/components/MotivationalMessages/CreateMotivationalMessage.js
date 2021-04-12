
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

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { readCookie } from '../../providers/reducer';
import Particles from '../Particles';
toast.configure();

function CreateMotivationalMessage(props) {

    const [{ endpoint_API }] = useStateValue();

    const apiUrl =  endpoint_API+"/createMotivationalMessage";

    const [creator, setCreator] = useState([]);

    const [showLoading, setShowLoading] = useState(true);

    //Initializing user to get and set values by using onchange event
    const [motivationalMessage, setMotivationalMessage] = useState({
        _id: '',
        title: '',
        description: '',
        linkVideo: '',
        linkImage: '',
        createdBy: ''
    });

    useEffect(() => {

        setShowLoading(true);
        
        const getUserInfo = () => {
            readCookie.then((result) => {
                // setUserEmail(result.userEmail);
                // setUserRole(result.userRole);
                // setUserId(result.userId);
                getCreatorUser(result.userId);
            });
        }
        getUserInfo();
        setShowLoading(false);

    }, []);

    /******************************************** */
    //Get the creator 
    //******************************************** */
    const getCreatorUser = async (userId) => {
        const result = await Axios('/user/' + userId);
        setCreator(result.data);
    }

    //updates the motivational message values when changing the values
    const onChange = (event) => {
        event.persist();
        setMotivationalMessage({ ...motivationalMessage, [event.target.name]: event.target.value });
    }

    //Creates motivational message consuming backend services
    const createMotivationalMessage = () => {

        const data = {
            title: motivationalMessage.title,
            description: motivationalMessage.description,
            linkVideo: motivationalMessage.linkVideo,
            linkImage: motivationalMessage.linkImage,
            createdBy: creator
        };

        
        Axios.post(apiUrl, data)
            .then((result) => {
                setShowLoading(true);
                toast.info('Motivational Message created successfully!', { position: toast.POSITION.BOTTOM_RIGHT, })
                setTimeout(function () {
                    props.history.push({
                        pathname: '/motivationalMessages' 
                      });
                }, 1000);
            }).catch((error) => {
                toast.error('Error ' + error, { position: toast.POSITION.BOTTOM_RIGHT, });
            })
    };

    return (
        <div>
            < Dashboard title='Create Motivational Message' />
            <Particles />

            <div className="container container__custom">
                <section className="jumbotron text-center bg-light p-5 rounded jumbotron__custom">

                    {showLoading &&
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    }
                    <Typography component="h1" variant="h5">
                        Create new Motivational Message
                    </Typography>

                    <hr></hr>                    

                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={12} >
                            <TextField
                                autoComplete="title"
                                name="title"
                                variant="outlined"
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                autoFocus
                                value={motivationalMessage.title}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <TextField
                                autoComplete="description"
                                name="description"
                                variant="outlined"
                                required
                                fullWidth
                                id="description"
                                label="Motivational message"
                                autoFocus
                                value={motivationalMessage.description}
                                onChange={onChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} >
                            <TextField
                                autoComplete="linkImage"
                                name="linkImage"
                                variant="outlined"
                                required
                                fullWidth
                                id="linkImage"
                                label="Image link"
                                autoFocus
                                value={motivationalMessage.linkImage}
                                onChange={onChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} >
                            <TextField
                                autoComplete="linkVideo"
                                name="linkVideo"
                                variant="outlined"
                                required
                                fullWidth
                                id="linkVideo"
                                label="Video link"
                                autoFocus
                                value={motivationalMessage.linkVideo}
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
                        onClick={() => { createMotivationalMessage() }}
                    >
                        Create Motivational message
                    </Button>
                    
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<ListIcon />}
                        className='button__custom'
                        onClick={() => {
                            props.history.push({
                              pathname: '/motivationalMessages' 
                            });
                          }} 
                    > Back
                    </Button>
                    


                </section>
            </div>
        </div>
    );

}

export default withRouter(CreateMotivationalMessage);