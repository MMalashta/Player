import mongoose, {Schema} from 'mongoose'

let SongSchema = new Schema({
    title: String,
    artist: String,
    url: String
});

export default mongoose.model('Song', SongSchema);