import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';
import '../Styles.css'
import Dashboard from '../Dashboard';
import 'react-animated-slider/build/horizontal.css';
import Checkbox from '@material-ui/core/Checkbox';
import { Backdrop, Button, CircularProgress, Fade, Modal } from '@material-ui/core';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import { useStateValue } from '../../providers/StateProvider';

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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));


function Checklist(props) {

    const [showLoading, setShowLoading] = useState(false);
    const [openModal, setOpenModal] = useState('');
    const classes = useStyles();

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


    const [arthritisProbability, setArthritisProbability] = useState('');
    const [hypertensionProbability, setHypertensionProbability] = useState('');
    const [asthmaProbability, setAsthmaProbability] = useState('');
    const [cancerProbability, setCancerProbability] = useState('');
    const [bronchitisProbability, setBronchitisProbability] = useState('');
    const [chronicKidneyDiseaseProbability, setChronicKidneyDiseaseProbability] = useState('');

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    //Loading options
    const [loading, setLoading] = useState(false);
    const handleCloseLoading = () => {
        setLoading(false);
    };
    const handleToggleLoading = () => {
        setLoading(!loading);
    };

    const handleChange = (event) => {
        event.persist();
        setSyntoms({ ...syntoms, [event.target.name]: event.target.checked });
    }

    const sendInfo = () => {

        handleToggleLoading();
        Axios.post(apiUrl, syntoms)
            .then((result) => {

                setArthritisProbability((result.data.row1[0] * 100).toFixed(2));
                setHypertensionProbability((result.data.row1[1] * 100).toFixed(2));
                setAsthmaProbability((result.data.row1[2] * 100).toFixed(2));
                setCancerProbability((result.data.row1[3] * 100).toFixed(2));
                setBronchitisProbability((result.data.row1[4] * 100).toFixed(2));
                setChronicKidneyDiseaseProbability((result.data.row1[5] * 100).toFixed(2));
                handleOpenModal();
                handleCloseLoading();


            }).catch((error) => {
                toast.error('Error ' + error, { position: toast.POSITION.BOTTOM_RIGHT, });
            })
    };


    return (
        <div>
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>

            < Dashboard title='Checklist' />
            <div className="container container__custom">

                <section className="jumbotron text-center bg-light p-5 rounded jumbotron__custom">

                    <div>
                        <div className="card mb-3 bg-light" >
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src="https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" class="card-img" alt="..." />

                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h2> Machine Learning   </h2>
                                        <p>Describe your symptoms</p>
                                        <hr></hr>


                                        <div className='ckecklist_content__custom'>

                                            <div className='checklist_option__custom'>
                                                <h5>  <Checkbox
                                                    name="syntom1"
                                                    checked={syntoms.syntom1}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            Joint pain, tenderness and stiffness.
                                            </h5>
                                            </div>

                                            <div className='checklist_option__custom'>
                                                <h5>  <Checkbox
                                                    name="syntom2"
                                                    checked={syntoms.syntom2}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            Restricted movement of joints.
                                            </h5>
                                            </div>

                                            <div className='checklist_option__custom'>
                                                <h5>  <Checkbox
                                                    name="syntom3"
                                                    checked={syntoms.syntom3}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            Inflammation in and around the joints.
                                            </h5>
                                            </div>

                                            <div className='checklist_option__custom'>
                                                <h5>  <Checkbox
                                                    name="syntom4"
                                                    checked={syntoms.syntom4}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            Heart Disease.
                                            </h5>
                                            </div>

                                            <div className='checklist_option__custom'>
                                                <h5>  <Checkbox
                                                    name="syntom5"
                                                    checked={syntoms.syntom5}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            Kidney Disease.
                                            </h5>
                                            </div>


                                            <div className='checklist_option__custom'>
                                                <h5>  <Checkbox
                                                    name="syntom6"
                                                    checked={syntoms.syntom6}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            Shortness of breath
                                            </h5>
                                            </div>

                                            <div className='checklist_option__custom'>
                                                <h5>  <Checkbox
                                                    name="syntom7"
                                                    checked={syntoms.syntom7}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            Coughing
                                            </h5>
                                            </div>

                                            <div className='checklist_option__custom'>
                                                <h5>  <Checkbox
                                                    name="syntom8"
                                                    checked={syntoms.syntom8}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            A tight sensation in the chest.
                                            </h5>
                                            </div>

                                            <div className='checklist_option__custom'>
                                                <h5>  <Checkbox
                                                    name="syntom9"
                                                    checked={syntoms.syntom9}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            Finding unexpected lump
                                            </h5>
                                            </div>


                                            <div className='checklist_option__custom'>
                                                <h5>  <Checkbox
                                                    name="syntom10"
                                                    checked={syntoms.syntom10}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            Unexperimented weight loss
                                            </h5>
                                            </div>

                                            <div className='checklist_option__custom'>
                                                <h5>  <Checkbox
                                                    name="syntom11"
                                                    checked={syntoms.syntom11}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            Unexplained blood in the when coughing , urine
                                            </h5>
                                            </div>

                                            <div className='checklist_option__custom'>
                                                <h5>  <Checkbox
                                                    name="syntom12"
                                                    checked={syntoms.syntom12}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            Sore throat
                                            </h5>
                                            </div>

                                            <div className='checklist_option__custom'>
                                                <h5>  <Checkbox
                                                    name="syntom13"
                                                    checked={syntoms.syntom13}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            Headaches
                                            </h5>
                                            </div>

                                            <div className='checklist_option__custom'>
                                                <h5>  <Checkbox
                                                    name="syntom14"
                                                    checked={syntoms.syntom14}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            Fatigue
                                            </h5>
                                            </div>

                                            <div className='checklist_option__custom'>
                                                <h5>  <Checkbox
                                                    name="syntom15"
                                                    checked={syntoms.syntom15}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            Feeling sick
                                            </h5>
                                            </div>

                                            <div className='checklist_option__custom'>
                                                <h5>  <Checkbox
                                                    name="syntom16"
                                                    checked={syntoms.syntom16}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            Swollen ankles, feet or hands
                                            </h5>
                                            </div>

                                            <div className='checklist_option__custom'>
                                                <h5>  <Checkbox
                                                    name="syntom17"
                                                    checked={syntoms.syntom17}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            Tirdness.
                                            </h5>
                                            </div>
                                            <hr></hr>

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

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 1000,
                }}
            >
                <Fade in={openModal}>

                    <div className={classes.paper}>
                        <div className='modal__custom'>
                            <h2 id="transition-modal-title">Prediction based on system's data</h2>
                            {arthritisProbability > 0 ? 
                                <p id="transition-modal-description"> Arthritis probability: {arthritisProbability} %</p> 
                                : <p></p>
                            }
                            {arthritisProbability > 0 ? 
                                <p id="transition-modal-description"> Hypertension probability: {arthritisProbability} %</p> 
                                : <p></p>
                            }
                            {asthmaProbability > 0 ? 
                                <p id="transition-modal-description"> Asthma probability: {asthmaProbability} %</p> 
                                : <p></p>
                            }
                            {cancerProbability > 0 ? 
                                <p id="transition-modal-description"> Cancer probability:: {cancerProbability} %</p> 
                                : <p></p>
                            }
                            {bronchitisProbability > 0 ? 
                                <p id="transition-modal-description"> Bronchitis probability: {bronchitisProbability} %</p> 
                                : <p></p>
                            }
                            {chronicKidneyDiseaseProbability > 0 ? 
                                <p id="transition-modal-description"> Chronic kidney disease probability: {chronicKidneyDiseaseProbability} %</p> 
                                : <p></p>
                            }

                            
                            
                         

                        </div>
                    </div>
                </Fade>
            </Modal>

        </div >
    );

}

export default withRouter(Checklist);