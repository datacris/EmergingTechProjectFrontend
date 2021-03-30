import { withRouter } from 'react-router-dom';
import React, {  } from 'react';
import './Styles.css'
import Dashboard from './Dashboard';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

function About(props) {


    return (
        <div>
            < Dashboard title='About this app' />

            <div className="container container__custom">

                <section className="jumbotron text-center bg-light p-5 rounded jumbotron__custom">

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
                                            <h4><CheckCircleOutlineIcon className='check__custom' /> Back-End: Rest API using Express js, Node js</h4>
                                            <h4><CheckCircleOutlineIcon className='check__custom' /> Front-End using React, Bootstrap, Material-UI</h4>
                                            <h4><CheckCircleOutlineIcon className='check__custom' /> DBS: MongoDB (mongoose)</h4>
                                            <h4><CheckCircleOutlineIcon className='check__custom' /> Machine Learning: linear regression </h4>
                                            <h4><CheckCircleOutlineIcon className='check__custom' /> Authentication using JWT</h4>
                                            <hr></hr>
                                            <h4><CheckCircleOutlineIcon className='check__custom' /> Animated Slider</h4>
                                            <h4><CheckCircleOutlineIcon className='check__custom' /> Notification System</h4>
                                            <h4><CheckCircleOutlineIcon className='check__custom' /> Video player</h4>
                                            <hr></hr>
                                            <h4><CheckCircleOutlineIcon className='check__custom' /> MongoDB Atlas deployment (Cloud)</h4>
                                            <h4><CheckCircleOutlineIcon className='check__custom' /> Heroku Backend deploymeny  (Cloud)</h4>

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

export default withRouter(About);