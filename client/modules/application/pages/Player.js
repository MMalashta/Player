import React, {Component} from 'react'
import ApplicationStore, {dispatch} from '../../../ApplicationStore'
import TabsInstance from '../components/TabsInstance'

class Player extends Component{
    render() {
        return <div id="player">
                <TabsInstance></TabsInstance>
        </div>
    }
}

export default Player