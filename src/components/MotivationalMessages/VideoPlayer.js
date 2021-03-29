import React from 'react'
import ReactPlayer from 'react-player/youtube'
import '../Styles.css'

function VideoPlayer(props) {
    return (
        <div>
            <div className='player-wrapper'>
                <ReactPlayer
                    className='react-player'
                    url={props.url}
                    width='100%'
                    height='100%'
                    controls={true}
                    playing={true}
                />
            </div>
        </div>
    )
}

export default VideoPlayer
