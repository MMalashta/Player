import mongoose, {Schema} from 'mongoose'

let ArtistSchema = new Schema({
    name: String,
    description: String,
    imgUrl: String,
    tracks: [],
    tags: [String]
});

export default mongoose.model('Artist', ArtistSchema);