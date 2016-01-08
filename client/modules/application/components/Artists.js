import React, {Component} from 'react'
import Artist from './Artist'
import {connect} from 'react-redux'
import {Row, Col} from 'react-bootstrap'

@connect(({artists: {artists}}) => ({artists}))
class Artists extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        console.log(this.props.artists, Array.isArray(this.props.artists));
        return <Row style={{paddingLeft: '10px', paddingRight: '10px'}}>
            {this.props.artists ? this.props.artists.map((artist) => (
                <Col md="3" style={{marginTop: "10px"}}>
                    <Artist artist={artist} />
                </Col>
                )) : null}
        </Row>
    }
}

export default Artists