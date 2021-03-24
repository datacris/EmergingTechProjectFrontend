import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useStateValue } from '../providers/StateProvider';
//

import { Link } from 'react-router-dom';
import Home from './Home';
//

function App() {

  const [{ endpoint_API, user }, dispatch] = useStateValue();

  //state variable for the screen, admin or user
  const [screen, setScreen] = useState('auth');

  //store input field data, user name and password
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const apiUrl = endpoint_API + "/signin";


  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []); //only the first render
  //

  //send username and password to the server
  // for initial authentication
  const auth = async () => {
    console.log('calling auth')
    console.log(username)
    try {
      //make a get request to /authenticate end-point on the server
      const loginData = { auth: { username, password } }
      //call api
      const res = await axios.post(apiUrl, loginData);
      console.log(res.data.auth)
      console.log(res.data.screen)
      //process the response
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) { //print the error
      console.log(e);
    }

  };

  //check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log('--- in readCookie function ---');

      //
      const res = await axios.get('/read_cookie');
      // 
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen)
      }
    } catch (e) {
      setScreen('auth');
      console.log(e);
    }
  };

  return (
    <div className="App">
      {screen === 'auth'
        ? <div>
          <div class="container container__custom">
            <Jumbotron>
              <Form >

                <h2 class="jumbotron-heading"> Student Sign Up </h2>
                <hr></hr>

                <Form.Group>
                  <Form.Label> Student Number </Form.Label>
                  <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label> Password</Form.Label>
                  <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <hr></hr>

                <Button className='button__custom' variant="success" onClick={auth}>
                  Sign-In
                        </Button>

                <Link to='/studentSignUp'>
                  <Button className='button__custom' variant='secondary' >Create an account</Button>
                </Link>

              </Form>
            </Jumbotron>
          </div>
        </div>

        : <div>
          < Home />
        </div>
        // : <View screen={screen} setScreen={setScreen} />
      }
    </div>
  );
}

export default App;

