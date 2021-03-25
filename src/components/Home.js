
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import './Styles.css'
import Dashboard from './Dashboard';

function Home(props) {


    return (
        <div>
            < Dashboard title='Home'/>

                <div class="container container__custom">

                    <section class="jumbotron text-center bg-light p-5 rounded">
                        <h2 class="jumbotron-heading"> MERN Stack (MongoDB, Express, React, Node js) </h2>
                        <p>Lab Assignment #3 Developed by Cristian Zuluaga.</p>
                        <p>This web app allows to CRUD courses, as well as register students to enroll and drop courses</p>
                    </section>

                </div>
        </div>
    );

}

export default withRouter(Home);