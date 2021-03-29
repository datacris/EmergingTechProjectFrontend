import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardColumns from 'react-bootstrap/CardColumns'
import { withRouter } from 'react-router';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import VideoPlayer from './VideoPlayer';
import Moment from 'react-moment';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function MotivationalMessageCard(props) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Card className='motivational_card__custom' onClick={handleOpen}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={props.linkImage}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="h2">
                            {props.title}
                        </Typography>
                        <Typography  color="textSecondary" component="p">
                            {props.description}
                        </Typography>
                        <hr></hr>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Nurse. {props.createdBy.fullName} - <Moment format="YYYY-MM-DD HH:mm">{props.creationDate}</Moment>
                        </Typography>

                    </CardContent>
                </CardActionArea>
            </Card>



            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 1000,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div className='modal__custom'>
                            <h2 id="transition-modal-title">{props.title}</h2>
                            <p id="transition-modal-description">{props.description}</p>
                            <VideoPlayer url={props.linkVideo} />
                        </div>
                    </div>
                </Fade>
            </Modal>

        </div>


    );
}

export default withRouter(MotivationalMessageCard);