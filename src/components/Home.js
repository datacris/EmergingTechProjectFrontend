import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import './Styles.css'
import Dashboard from './Dashboard';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

function Home(props) {

    const slides = [
        { title: 'HEALTH APP', description: 'This app helps patient to be in touch with nurse practitioners', image: 'https://www.nurseoncall.ie/_fileupload/Image/Homepage_Banner3.jpg_Thumbnail0.jpg' },
        { title: 'Emergency alerts', description: 'Emergency messages for medical attention', image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80' },
        { title: 'Motivational Messages', description: 'Multimedia motivational messages', image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
        { title: 'Vital Signs', description: 'Patient and Nurse vital signs to monitor patient health', image: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80' },
        { title: 'Machine Learning', description: 'Checklists for machine learning processes', image: 'https://images.unsplash.com/photo-1504711331083-9c895941bf81?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80' }
    ];


    return (
        <div>
            < Dashboard title='Home' />

            <div class="container container__custom">

                <section class="jumbotron text-center bg-light p-5 rounded jumbotron__custom home__custom">
                    <h2 class="jumbotron-heading">  </h2>

                    <Slider autoplay={1000}>
                        {slides.map((item, index) => (
                            <div
                                key={index}
                                style={{ background: `url('${item.image}') no-repeat center center` }}
                            >
                                <div className='slider__custom'>
                                    <h1>{item.title}</h1>
                                    <h5>{item.description}</h5>
                                    {/* <button>{item.button}</button> */}
                                </div>
                            </div>
                        ))}
                    </Slider>

                </section>




            </div>
        </div>
    );

}

export default withRouter(Home);