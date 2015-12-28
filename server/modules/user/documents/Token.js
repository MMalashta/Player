import mongoose, {Schema} from 'mongoose'
import authPlugin from 'passport-local-mongoose'

let UserSchema = new Schema({
    email: String,
    role: {type: String, default: 'user'}
});

UserSchema.plugin(authPlugin);

export default User = mongoose.model('User', UserSchema);