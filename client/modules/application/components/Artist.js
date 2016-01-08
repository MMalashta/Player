import React, {Component} from 'react'
import {Image, Panel, Row, Col} from 'react-bootstrap'
import {connect} from 'react-redux'

//@connect(({playlists: {currentPlaylist, playlistSongs}}) => ({currentPlaylist, playlistSongs}))
class Artist extends Component {
    render(){
        let artist = this.props.artist;
        let image = <Image src={artist.imgUrl} circle style={{width: '200px', height: '200px'}}/>
        return (
            <Panel>
                <Row>
                    <Col className="col-md-8 col-md-offset-2" style={{paddingLeft: '5px'}}>
                        {image}
                    </Col>
                </Row>
                <h4>{artist.name}</h4>
                <Row style={{padding: '0 10px'}}>
                {artist.tags.map((tag, index) => (
                   (index <= 2)
                    ? <span className="badge" style={{marginRight: "5px"}}>
                        {tag}
                    </span>
                    : null

                ))}
                </Row>
            </Panel>
        );
    }
}

export default Artist