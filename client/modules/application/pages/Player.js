import React, {Component} from 'react'

class Player extends Component{
    render() {
        return <audio controls>
                    <source src="audio/music.ogg" type="audio/ogg; codecs=vorbis">
                    <source src="audio/music.mp3" type="audio/mpeg">
                </audio>
    }
}

export default Player