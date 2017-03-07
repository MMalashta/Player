import { Router } from 'express'
import Playlist from './../documents/Playlist'
import Song from './../documents/Song'

const router = Router()

router.post('/create', (req, res, next) => {
    let promise = new Promise((resolve, reject) => {
        Playlist.findOne({"title": req.body.title, "owner": req.body.owner}, (err, pl) => {
            if (err) {
                reject(err.message);
            }
            if (pl && pl != null) {
                reject("playlist with given name is already created");
            } else {
                resolve(req.body);
            }

        });
    });
    promise.
    then(
        result => {
            let pl = new Playlist({
                title: result.title,
                owner: result.owner,
                tracks: []
            });
            console.log(pl.title);
            pl.save((err, pl) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: err.message
                    });
                }
                return res.json({
                    success: true,
                    data: pl
                });
            });
        },
        error => {
            return res.json({
                success: false,
                message: error
            });
        }
    );
});

router.post('/remove', (req, res, next) => {
    let removePlaylistIds = [];
    Playlist.find({'_id': {$in: req.body.checkedPlaylists}}, (err, playlists)=> {
        if (err) {
            return res.json({
                success: false,
                message: err.message
            });
        }

        playlists.forEach( (playlist) => {
            removePlaylistIds.push(playlist._id);
            playlist.remove();
        });

        return res.json({
            success: true,
            removePlaylistIds: removePlaylistIds
        });
    });
});

router.post('/loadAll', (req, res, next) => {
    Playlist.find({"owner": req.body.userID}, (err, playlists)=> {
        if (err) {
            return res.json({
                success: false,
                message: err.message
            });
        }
        return res.json({
            success: true,
            data: playlists
        });
    })
});

router.post('/addSong', (req, res, next) => {
    let playlistName = req.body.playlist,
        songId = req.body.id;

    Playlist.findOne({"title": playlistName}, (err, pl) => {
        if (err) {
            return res.json({
                success: false,
                message: err.message
            });
        }

        if (pl && pl != null) {
            if (pl.tracks.indexOf(songId) === -1) {
                pl.tracks.push(songId);
                pl.modified = new Date();

                pl.save(function (err) {
                    if (err) {
                        return res.json({
                            success: false,
                            message: err.message
                        });
                    }
                    return res.json({
                        success: true,
                        song: songId,
                        playlist: pl._id
                    });
                });
            } else {
                return res.json({
                    success: false,
                    message: "you have this song in your playlist already"
                });
            }
        }
    });
});

router.post('/removeSong', (req, res, next) => {
    Playlist.findOne({'_id' : req.body.playlistID}, (err, pl) => {
        if (err) {
            return res.json({
                success: false,
                message: err.message
            });
        }
        if (pl && pl != null) {
            let index = pl.tracks.indexOf(req.body.songID);
            if (index === -1) {
                return res.json({
                    success: false,
                    message: "can't find this song in playlist"
                });
            } else {
                pl.tracks.splice(index, 1);
                pl.modified = new Date();
                pl.save(function (err) {
                    if (err) {
                        return res.json({
                            success: false,
                            message: err.message
                        });
                    }
                    return res.json({
                        success: true,
                        playlist: pl
                    });
                });
            }
        }
    });
});

router.post('/load', (req, res, next) => {
    Playlist.findOne({"title": req.body.playlist, "owner": req.body.owner}, (err, pl) => {
        if (err) {
            return res.json({
                success: false,
                message: err.message
            });
        }
        if (pl && pl != null) {
            Song.find({'_id': {$in: pl.tracks}}, (err, songs) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: err.message
                    });
                }
                return res.json({
                    success: true,
                    currentPlaylist: pl,
                    playlistSongs: songs
                });
            });
        }
    });
});

export default router
