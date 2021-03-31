import { withRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../Styles.css'
import Dashboard from '../Dashboard';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import { readCookie } from '../../providers/reducer';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import { toast } from 'react-toastify';
import Axios from 'axios';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useStateValue } from '../../providers/StateProvider';


function Checklist(props) {

    const [showLoading, setShowLoading] = useState(false);

    //Getting FRONT endpoint from reducer and stateProvider
    const [{ endpoint_API }] = useStateValue();
    const apiUrl = endpoint_API + "/findDiagnostic";

    //Initializing user to get and set values by using onchange event
    const [syntoms, setSyntoms] = useState({
        syntom1: false,
        syntom2: false,
        syntom3: false,
        syntom4: false,
        syntom5: false,
        syntom6: false,
        syntom7: false,
        syntom8: false,
        syntom9: false,
        syntom10: false,
        syntom11: false,
        syntom12: false,
        syntom13: false,
        syntom14: false,
        syntom15: false,
        syntom16: false,
        syntom17: false
    });

    const handleChange = (event) => {
        event.persist();
        setSyntoms({ ...syntoms, [event.target.name]: event.target.checked });
    }

    const sendInfo = () => {
        setShowLoading(true);
        Axios.post(apiUrl, syntoms)
            .then((result) => {
                setShowLoading(false);
                console.log('------------PREDICTION')
                console.log(result.data)
                toast.info('Emergency alert created successfully!', { position: toast.POSITION.BOTTOM_RIGHT, })


            }).catch((error) => {
                toast.error('Error ' + error, { position: toast.POSITION.BOTTOM_RIGHT, });
            })
    };


    return (
        <div>
            < Dashboard title='Checklist' />
            <div className="container container__custom">

                <section className="jumbotron text-center bg-light p-5 rounded jumbotron__custom">
                    {showLoading &&
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    }

                    <div>
                        <div className="card mb-3 bg-light" >
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src="https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" class="card-img" alt="..." />
                                    {/* <img alt="Responsive image" src="https://images.unsplash.com/photo-1557853197-aefb550b6fdc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80" class="card-img" alt="..." /> */}
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h2> Full-Stack web app  </h2>
                                        <h4>MERN Stack approach</h4>
                                        <hr></hr>


                                        <div className='about_items__custom'>


                                            <h5>  <Checkbox
                                                name="syntom1"
                                                checked={syntoms.syntom1}
                                                onChange={handleChange}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            Joint pain, tenderness and stiffness.
                                            </h5>

                                            <h5>  <Checkbox
                                                name="syntom2"
                                                checked={syntoms.syntom2}
                                                onChange={handleChange}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            Restricted movement of joints.
                                            </h5>

                                            <h5>  <Checkbox
                                                name="syntom3"
                                                checked={syntoms.syntom3}
                                                onChange={handleChange}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            Inflammation in and around the joints.
                                            </h5>

                                            <h5>  <Checkbox
                                                name="syntom4"
                                                checked={syntoms.syntom4}
                                                onChange={handleChange}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            Heart Disease.
                                            </h5>

                                            <h5>  <Checkbox
                                                name="syntom5"
                                                checked={syntoms.syntom5}
                                                onChange={handleChange}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            Kidney Disease.
                                            </h5>


                                            <h5>  <Checkbox
                                                name="syntom6"
                                                checked={syntoms.syntom6}
                                                onChange={handleChange}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            Shortness of breath
                                            </h5>

                                            <h5>  <Checkbox
                                                name="syntom7"
                                                checked={syntoms.syntom7}
                                                onChange={handleChange}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            Coughing
                                            </h5>

                                            <h5>  <Checkbox
                                                name="syntom8"
                                                checked={syntoms.syntom8}
                                                onChange={handleChange}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            A tight sensation in the chest.
                                            </h5>

                                            <h5>  <Checkbox
                                                name="syntom9"
                                                checked={syntoms.syntom9}
                                                onChange={handleChange}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            Finding unexpected lump
                                            </h5>

                                            <h5>  <Checkbox
                                                name="syntom10"
                                                checked={syntoms.syntom10}
                                                onChange={handleChange}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            Unexperimented weight loss
                                            </h5>

                                            <h5>  <Checkbox
                                                name="syntom11"
                                                checked={syntoms.syntom11}
                                                onChange={handleChange}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            Unexplained blood in the when coughing , urine
                                            </h5>

                                            <h5>  <Checkbox
                                                name="syntom12"
                                                checked={syntoms.syntom12}
                                                onChange={handleChange}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            Sore throat
                                            </h5>

                                            <h5>  <Checkbox
                                                name="syntom13"
                                                checked={syntoms.syntom13}
                                                onChange={handleChange}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            Headaches
                                            </h5>

                                            <h5>  <Checkbox
                                                name="syntom14"
                                                checked={syntoms.syntom14}
                                                onChange={handleChange}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            Fatigue
                                            </h5>

                                            <h5>  <Checkbox
                                                name="syntom15"
                                                checked={syntoms.syntom15}
                                                onChange={handleChange}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            Feeling sick
                                            </h5>

                                            <h5>  <Checkbox
                                                name="syntom16"
                                                checked={syntoms.syntom16}
                                                onChange={handleChange}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            Swollen ankles, feet or hands
                                            </h5>

                                            <h5>  <Checkbox
                                                name="syntom17"
                                                checked={syntoms.syntom17}
                                                onChange={handleChange}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            Tirdness.
                                            </h5>

                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                onClick={sendInfo}
                                            >
                                                Send
                                            </Button>
                                        </div>

                                        <hr></hr>
                                        <p className="card-text"><small className="text-muted">Developed by Cristian Zuluaga</small></p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

            </div>

        </div>
    );

}

export default withRouter(Checklist);