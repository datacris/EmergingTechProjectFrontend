import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import { Link, withRouter } from 'react-router-dom';
import Axios from 'axios';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import TheatersIcon from '@material-ui/icons/Theaters';
import StarsIcon from '@material-ui/icons/Stars';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import './Styles.css'




function Dashboard(props) {
  const classes = useStyles();


  useEffect(() => {

    readCookie();

  }, []);


  //To store cookie credentials
  const [userRole, setUserRole] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');



  //Reads the cookie to get user info
  const readCookie = async () => {
    try {

      const res = await Axios.get('/read_cookie');

      if (res.data.userEmail !== '') {

        setUserEmail(res.data.userEmail);
        setUserRole(res.data.userRole);
        setUserId(res.data.userId);
        // getCourses(res.data.userId);
      }

    } catch (e) {
      setUserRole('');
      props.history.push('/SignIn')
      console.log(e);
    }
  };

  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable 
  const deleteCookie = async () => {
    try {
      await Axios.get('/signOut');
      setUserRole('');
      props.history.push('/')

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} >
        <Toolbar className='toolbar__custom'>
          <Typography variant="h5" noWrap>
            {props.title}
          </Typography>

          <div className='user_header__custom'>
            <Typography variant="h5" noWrap >
              Hi {userRole} <AccountCircleIcon fontSize="large" />
            </Typography>
            <Typography variant="h6" noWrap justify="flex-end" >
              {userEmail}
            </Typography>
          </div>


        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>

          <List className="link__custom">

            {userRole === 'nurse' ?
              <div>

                <Link to='/Home' >
                  <ListItem button>
                    <ListItemIcon>
                      <DashboardIcon fontSize="large" color={props.title === 'Home' ? 'secondary' : 'primary'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                </Link>

                <Link to='/listPatients'>
                  <ListItem button>
                    <ListItemIcon>
                      <PeopleIcon fontSize="large" color={props.title === 'Patient list' ? 'secondary' : 'primary'} />
                    </ListItemIcon>
                    <ListItemText primary="Patients" />
                  </ListItem>
                </Link>

                <ListItem button>
                  <ListItemIcon>
                    <AddAlertIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary="Emergency alerts" />
                </ListItem>

                <ListItem button>
                  <ListItemIcon>
                    <StarsIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary="Daily tips" />
                </ListItem>

                <ListItem button>
                  <ListItemIcon>
                    <BarChartIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary="Checklist Reports" />
                </ListItem>


              </div>
              :
              <div></div>

            }

            {userRole === 'patient' ?
              <div>
                <Link to='/Home' >
                  <ListItem button>
                    <ListItemIcon>
                      <DashboardIcon fontSize="large" color={props.title === 'Home' ? 'secondary' : 'primary'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                </Link>


                <ListItem button
                  onClick={() => {
                    props.history.push({
                      pathname: '/emergencyAlertsBypatient/' + userId
                    });
                  }}  >
                  <ListItemIcon>
                    <AddAlertIcon fontSize="large" color={props.title === 'Emergency Alerts' ? 'secondary' : 'primary'} />
                  </ListItemIcon>
                  <ListItemText primary="Emergency alerts" />
                </ListItem>


                <ListItem button
                  onClick={() => {
                    props.history.push({
                      pathname: '/vitalSignsBypatient/' + userId
                    });
                  }}  >
                  <ListItemIcon>
                    <LocalHospitalIcon fontSize="large" color={props.title === 'Vital Signs' ? 'secondary' : 'primary'} />
                  </ListItemIcon>
                  <ListItemText primary="Vital signs" />
                </ListItem>

                <ListItem button>
                  <ListItemIcon>
                    <TheatersIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary="Multimedia" />
                </ListItem>

                <ListItem button>
                  <ListItemIcon>
                    <StarsIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary="Daily tips" />
                </ListItem>


                <ListItem button>
                  <ListItemIcon>
                    <PlaylistAddCheckIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary="Checklist" />
                </ListItem>
              </div>
              :
              <div></div>

            }

          </List>

          <Divider />
          <List>
            <ListItem button onClick={deleteCookie}>
              <ListItemIcon>
                <ExitToAppIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItem>
          </List>

        </div>
      </Drawer>


    </div>
  );
}

export default withRouter(Dashboard);







const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
