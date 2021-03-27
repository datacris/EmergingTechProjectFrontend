import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import '../Styles.css'
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { Button, Typography } from '@material-ui/core';
import { readCookie } from "../../providers/reducer"
import Moment from 'react-moment';
import Axios from 'axios';
import { useStateValue } from '../../providers/StateProvider';

function EmergencyAlert(props) {

    //To store cookie credentials
    const [userRole, setUserRole] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {

        const getUserInfo = () => {
            readCookie.then((result) => {
                setUserEmail(result.userEmail);
                setUserRole(result.userRole);
                setUserId(result.userId);
            });
        }
        getUserInfo();
    }, []);

    //******************************************** */
    // Open the emergency alert to be responded
    //******************************************** */
    const respondEmergencyAlert = async (alertId) => {

        props.history.push({
            pathname: '/emergencyAlertResponse/' + alertId
        });
    }

    return (
        <div>
            <div class="card text-left bg-light mb-3 card__custom" >

                <div class="card-header">
                    {props.alertState === 'created' ?
                        <div className='emergency_alert__custom'>
                            <Typography noWrap color='secondary'>
                                Emergency alert Open <NewReleasesIcon color='secondary' />
                            </Typography>

                            {userRole === 'nurse' ?
                                <div className='button_response__custom'>
                                    <Button
                                        size='small'
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<NewReleasesIcon />}
                                        onClick={() => { respondEmergencyAlert(props._id) }}
                                    > Response
                                    </Button>
                                </div> :
                                <div></div>
                            }
                        </div>
                        :
                        <div className='emergency_alert__custom'>
                            <Typography noWrap >
                                Emergency alert Closed <DoneOutlineIcon />
                            </Typography>

                        </div>
                    }



                </div>

                <div class="card-body">
                    <h5 class="card-title"><strong>Alert message:</strong> {props.alertMessage}</h5>
                    <p class="card-text">{props.createdBy.fullName} - <Moment format="YYYY-MM-DD HH:mm">{props.creationDate}</Moment></p>

                    {props.answerDate &&
                        <div>
                            <hr></hr>
                            <h5 class="card-title"><strong>Response:</strong> {props.medicalResponse}</h5>
                            <p class="card-text">Nurse. {props.answeredBy.fullName} - <Moment format="YYYY-MM-DD HH:mm">{props.answerDate}</Moment></p>
                        </div>
                    }

                </div>
            </div>
        </div >

    );
}
export default withRouter(EmergencyAlert);
