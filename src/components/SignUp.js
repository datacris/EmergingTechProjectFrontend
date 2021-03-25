import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormControl, FormLabel } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { useStateValue } from '../providers/StateProvider';
import Axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router';
toast.configure();


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Cristian Zuluaga
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function SignUp(props) {
    const classes = useStyles();

    //var to set ad get radio button values
    const [radioTypeValue, setRadioTypeValue] = React.useState('patient');

    //Getting FRONT endpoint from reducer and stateProvider
    const [{ endpoint_API }, dispatch] = useStateValue();
    const apiUrl = endpoint_API + "/createUser";

    //Initializing user to get and set values by using onchange event
    const [user, setUser] = useState({
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        userType: ''
    });

    //updates the user values when changing the values
    const onChange = (event) => {
        event.persist();
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    //updates the radio button values
    const handleRadioTypeChange = (event) => {
        setRadioTypeValue(event.target.value);
    };

    //Creates the user by consuming backend services
    const createUser = (event) => {
        event.preventDefault();

        const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            userType: radioTypeValue
        };
        console.log(data)

        console.log(apiUrl);
        Axios.post(apiUrl, data)
            .then((result) => {
                toast.info('User ' +  result.data.email  + ' created Successfully!', { position: toast.POSITION.BOTTOM_RIGHT, })
                setTimeout(function(){ 
                    props.history.push('/') 
                }, 1000);
            }).catch((error) => {
                toast.error('Error ' + error, { position: toast.POSITION.BOTTOM_RIGHT, });
            })
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form} noValidate onSubmit={createUser}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={user.firstName}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={user.lastName}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={user.email}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={user.password}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">I am a ...</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={radioTypeValue} onChange={handleRadioTypeChange}>
                                    <FormControlLabel value="patient" control={<Radio />} label="Patient" />
                                    <FormControlLabel value="nurse" control={<Radio />} label="Nurse" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}


export default withRouter(SignUp);