import mongoose, {Schema} from 'mongoose'
import authPlugin from 'passport-local-mongoose'
import timestampsPlugin from 'mongoose-timestamp'

let UserSchema = new Schema({
    email: String,
    role: {type: String, default: 'user'}
});

UserSchema.plugin(authPlugin, {
    usernameUnique: true
});
UserSchema.plugin(timestampsPlugin);

let User = mongoose.model('User', UserSchema);

UserSchema.methods.toJSON= (obj) => {
    delete obj.hash
    delete obj.salt
    delete obj.password

    return obj
}


export default User