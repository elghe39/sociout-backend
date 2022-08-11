import mongoose from 'mongoose'

const { Schema } = mongoose

const friendSchema = new Schema({
    firstUserId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    secondUserId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {timestamps: true})

const friendModel = mongoose.model('Friend', friendSchema)

export default friendModel