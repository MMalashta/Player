import mongoose, {Schema} from 'mongoose'

let PlaylistSchema = new Schema({
    title: String,
    owner: String,
    tracks: []
});

export default mongoose.model('Playlist', PlaylistSchema);