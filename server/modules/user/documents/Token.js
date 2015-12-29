import mongoose, {Schema} from 'mongoose'
import timestampsPlugin from 'mongoose-timestamp'

let TokenSchema = new Schema({
    token: String,
    metadata: {},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    expires: Date
});

TokenSchema.plugin(timestampsPlugin)

export default mongoose.model('Token', TokenSchema);