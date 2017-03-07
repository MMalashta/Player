import { Router } from 'express'
import Artist from './../documents/Artist'

const router = Router()

router.get('/load', (req, res, next) => {
    Artist.find((err,artists) =>{
        if (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
        res.json({
            success: true,
            data: artists
        })
    });
});

router.post('/create', (req, res, next) => {
  console.log(req, req.body)
    let tracks = req.body.tracks.split(", "),
        tags = req.body.tags.split(", "),
        {name, description, imgUrl} = req.body;

    let artist = new Artist({
        name: name,
        description: description,
        imgUrl: imgUrl,
        tracks: tracks,
        tags: tags
    });

    artist.save((err, artist) => {
        if (err) {
            return res.json({
                success: false,
                message: err.message
            });
        }
    });

    res.json({
        status: 200
    })
});

export default router
