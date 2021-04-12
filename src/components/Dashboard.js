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
import { Link, withRouter } from 'react-router-dom';
import Axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import TheatersIcon from '@material-ui/icons/Theaters';
import StarsIcon from '@material-ui/icons/Stars';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useStateValue } from '../providers/StateProvider';
import logo from '../images/ApplicationLogo.png'

import './Styles.css'

function Copyright() {
  return (
    <div className='copy_right__custom'>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <br></br>
        <p>        Cristian Zuluaga  {new Date().getFullYear()} </p>
      </Typography>
    </div>
  );
}


function Dashboard(props) {

  const classes = useStyles();

  const [unansweredAlerts, setUnansweredAlerts] = useState([]);

  const [{ endpoint_API }] = useStateValue();
  const apiUrl = endpoint_API;

  useEffect(() => {

    //Reads the cookie to get user info
    const readCookie = async (props) => {
      try {
        console.log('----------------------------------------DASHBOARD   ' + apiUrl + '/read_cookie')
        const res = await Axios.get(apiUrl + '/read_cookie');
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

    readCookie();
    getUnansweredAlerts();

  }, []);


  //To store cookie credentials
  const [userRole, setUserRole] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');



  //******************************************** */
  //Gets the unanswered alerts
  //******************************************** */
  const getUnansweredAlerts = async () => {

    //Get emergency alerts 
    const res = await Axios('/unansweredAlerts/');
    setUnansweredAlerts(res.data);
  }

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



          <div className='notification__custom'>
            <IconButton color="inherit" fontSize="large">
              {userRole === 'nurse' ?

                (unansweredAlerts.length > 0 ?
                  <Link to='/emergencyAlerts' >
                    <Badge badgeContent={unansweredAlerts.length} color="secondary" fontSize="large">
                      <NotificationsIcon fontSize="large" />
                    </Badge>
                  </Link> :
                  <Badge color="secondary" fontSize="large">
                    <NotificationsIcon fontSize="large" />
                  </Badge>)
                :
                <Badge color="secondary" fontSize="large">
                  <NotificationsIcon fontSize="large" />
                </Badge>
              }


            </IconButton>
          </div>



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

                <Link to='/emergencyAlerts'>
                  <ListItem button>
                    <ListItemIcon>
                      <AddAlertIcon fontSize="large" color={props.title === 'Emergency Alerts' ? 'secondary' : 'primary'} />
                    </ListItemIcon>
                    <ListItemText primary="Emergency alerts" />
                  </ListItem>
                </Link>

                <Link>
                  <ListItem button
                    onClick={() => {
                      props.history.push({
                        pathname: '/motivationalMessages'
                      });
                    }}  >
                    <ListItemIcon>
                      <StarsIcon fontSize="large" color={props.title === 'Motivational Messages' ? 'secondary' : 'primary'} />
                    </ListItemIcon>
                    <ListItemText primary="Motivational Messages" />
                  </ListItem>
                </Link>




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

                <Link>
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
                </Link>

                <Link>
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
                </Link>

                <Link>
                  <ListItem button
                    onClick={() => {
                      props.history.push({
                        pathname: '/motivationalMessages'
                      });
                    }}  >
                    <ListItemIcon>
                      <TheatersIcon fontSize="large" color={props.title === 'Motivational Messages' ? 'secondary' : 'primary'} />
                    </ListItemIcon>
                    <ListItemText primary="Motivational Messages" />
                  </ListItem>
                </Link>

                <Link>
                  <ListItem button
                    onClick={() => {
                      props.history.push({
                        pathname: '/checklist'
                      });
                    }}  >
                    <ListItemIcon>
                      <PlaylistAddCheckIcon fontSize="large" color={props.title === 'Checklist' ? 'secondary' : 'primary'} />
                    </ListItemIcon>
                    <ListItemText primary="Checklist" />
                  </ListItem>
                </Link>
              </div>
              :
              <div></div>

            }

          </List>

          <Divider />

          <Link to='/about'  >
            <ListItem button >
              <ListItemIcon>
                <HelpOutlineIcon fontSize="large" color={props.title === 'About this app' ? 'secondary' : 'primary'} />
              </ListItemIcon>
              <ListItemText primary="About App" />
            </ListItem>
          </Link>

          <Link>
            <List className="link__custom">
              <ListItem button onClick={deleteCookie}>
                <ListItemIcon>
                  <ExitToAppIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItem>
            </List>
          </Link>

          <Divider />
          <img className='img__custom' src={logo} alt="" />

          <Copyright />


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
