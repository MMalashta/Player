import React, {Component} from 'react'
import {Tab, Tabs} from 'react-bootstrap'
import TrackList from '../components/TrackList'
import Playlists from './Playlists'

class TabsInstance extends Component{
    render() {
        return <Tabs defaultActiveKey={2}>
            <Tab eventKey={1} title="Tracks"><TrackList/></Tab>
            <Tab eventKey={2} title="Albums" disabled></Tab>
            <Tab eventKey={3} title="Artists" disabled></Tab>
            <Tab eventKey={4} title="Playlists"><Playlists/></Tab>
        </Tabs>
    }
}

export default TabsInstance