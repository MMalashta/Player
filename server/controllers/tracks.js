import { Router } from 'express'
import Song from './../documents/Song'

const router = Router()

router.get('/', (req, res, next) => {
    var songSet = new Set();
    Song.find((err,songs) =>{
        if (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
        songs.forEach((song) => {songSet.add(song)});
        res.json({
            success: true,
            data: songSet
        })
    });
});

export default router
