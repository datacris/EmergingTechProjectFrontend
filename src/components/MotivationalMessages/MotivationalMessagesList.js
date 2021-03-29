import { withRouter } from 'react-router-dom';
import React, { Component, useEffect, useState } from 'react';
import '../Styles.css'
import Dashboard from '../Dashboard';
import { useStateValue } from '../../providers/StateProvider';
import Axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { readCookie } from '../../providers/reducer';
import VideoPlayer from './VideoPlayer';
import MotivationalMessageCard from './MotivationalMessageCard';
import CardColumns from 'react-bootstrap/CardColumns';

function MotivationalMessagesList(props) {

    const [{ endpoint_API }, dispatch] = useStateValue();

    const [motivationalMessages, setMotivationalMessages] = useState([]);

    const [patient, setPatient] = useState([]);

    const [showLoading, setShowLoading] = useState(true);


    //To store cookie credentials
    const [userRole, setUserRole] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');


    useEffect(() => {

        setShowLoading(true);


        const getUserInfo = () => {
            readCookie.then((result) => {
                setUserEmail(result.userEmail);
                setUserRole(result.userRole);
                setUserId(result.userId);
            });
        }
        getUserInfo();
        getMotivationalMessages();
        setShowLoading(false);

    }, []);

    //******************************************** */
    //Gets motivational messages
    // //******************************************** */
    const getMotivationalMessages = async () => {

        const res = await Axios('/motivationalMessages');
        console.log(res.data)
        setMotivationalMessages(res.data);
    }

    //Call the view for register the new entity of Motivational message
    const addMotivationalMessage = () => {
        props.history.push({
            pathname: '/createMotivationalMessage/'
        });
    }

    return (
        <div>
            < Dashboard title='Motivational Messages' />

            <div class="container container__custom">

                <section class="jumbotron text-center bg-light p-5 rounded jumbotron__custom">


                    {showLoading &&
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    }

                    <Typography component="h1" variant="h5">
                        Motivational Messages
                    </Typography>

                    <hr></hr>

                    <div className="motivational_cards_container__custom">
                        <CardColumns>
                            {motivationalMessages.map((item) => (
                                <MotivationalMessageCard
                                    _id={item._id}
                                    title={item.title}
                                    description={item.description}
                                    linkVideo={item.linkVideo}
                                    linkImage={item.linkImage}
                                    createdBy={item.createdBy}
                                    creationDate={item.creationDate}
                                />
                            ))}
                        </CardColumns>
                    </div>

                    <hr></hr>

                    {userRole === 'nurse' ?
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            className='button__custom'
                            onClick={() => { addMotivationalMessage() }}
                        > Create post
                    </Button>
                        :
                        <div></div>
                    }




                </section>

            </div>
        </div>
    );

}

export default withRouter(MotivationalMessagesList);