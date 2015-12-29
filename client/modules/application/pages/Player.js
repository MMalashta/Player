import React, {Component} from 'react'
import {Input, Button, Alert} from 'react-bootstrap'
import TrackList from '../components/TrackList'


class Player extends Component{
    render() {
        return <div id="player">
                    <audio controls>
                        <source src="http://216.227.134.162/ost/contra-hard-corps/kxyodomjfq/01-konami-music.mp3" type="audio/ogg; codecs=vorbis" />
                        <source src="http://216.227.134.162/ost/contra-hard-corps/rtjcvgrqpw/02-locked-and-loaded.mp3" type="audio/mpeg" />
                        //http://216.227.134.162/ost/contra-hard-corps/ltmvmmvkxl/03-charshoe-x.mp3
                        //ttp://216.227.134.162/ost/contra-hard-corps/ekzoyctpts/04-contra-overdrive.mp3
                    </audio>
                    <div id="controls">
                        <TrackList/>
                        <Button>Prev</Button>
                        <Button>Next</Button>
                    </div>
                </div>
    }
}

export default Player