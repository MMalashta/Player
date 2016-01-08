import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import ApplicationStore, {dispatch} from '../../../ApplicationStore'
import CheckBox from '../../application/components/CheckBox'
import {removePl} from '../actions/removePlaylist'

@connect((playlists) => (playlists))
export default class RemovePlaylist extends Component {
    constructor() {
        super();
        this.remove = this.remove.bind(this);
    }

    remove() {
        let result = {
            checkedPlaylists: []
        };

        this.props.playlists.playlists.forEach((playlsit) => {
            if (this.refs[playlsit.title].getChecked()) {
                result.checkedPlaylists.push(playlsit._id);
            }
        });

        dispatch(removePl({
            playlistIDs: result,
            userID: this.props.playlists.playlists[0].owner
        }));
        this.props.wrapModal(null);
    }

    render() {
        return (
            <div>
                <form>
                    {this.props.playlists.playlists.map((pl, index) => (
                        <div>
                            <input type="hidden" name={pl.title} value={++index} />
                            <CheckBox ref={pl.title} label={pl.title} key={index} name={pl.title} value={++index} />
                        </div>
                    ))
                    }
                </form>
                <Button onClick={this.remove} bsStyle="primary" active>Remove</Button>
            </div>
        );
    }
}