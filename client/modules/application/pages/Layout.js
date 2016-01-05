import React, {Component} from 'react'
import NotificationTost from './../components/NotificationTost'
import Navigation from './../components/Navbar'
import Player from './Player'
import {connect} from 'react-redux'

@connect(({auth: {authenticated}}) => ({authenticated}))
class Layout extends Component {
    render() {
        return (
            <div>
                <Navigation />
                {(this.props.authenticated)? <Player /> : null}
                <div className="container-fluid">
                    {this.props.children}
                </div>
                <NotificationTost />
            </div>
        );
    }
}

export default Layout