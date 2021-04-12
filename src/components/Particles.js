import React from 'react'
import ParticlesJs from "react-particles-js";
import './Styles.css'

function Particles() {
    return (
        <div className='particles__custom'>
            <ParticlesJs

                params={{
                    particles: {
                        number: {
                            value: 30,
                            density: {
                                enable: true,
                                value_area: 900
                            }
                        },
                        line_linked: {
                            shadow: {
                                enable: true,
                                color: "#ffb74d",
                                blur: 10
                            },
                            enable: true,
                            color: "#ffb74d",
                            opacity: 0.4,
                            width: 2
                        },
                        shape: {
                            type: "circle",
                            stroke: {
                                width: 18,
                                color: "#ffb74d"
                            }
                        }
                    },
                    interactivity: {
                        detect_on: "canvas",
                        events: {
                            onhover: {
                                enable: false,
                                mode: "repulse"
                            },
                            onclick: {
                                enable: true,
                                mode: "push"
                            },
                            resize: true
                        }
                    }
                }}
            />
        </div>
    )
}

export default Particles
