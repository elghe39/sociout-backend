import mongoose from 'mongoose'

const { Schema } = mongoose

const notificationSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false
    },
    triggerId: {
        type: String,
    },
    postId: {

        type: String,
    }
}, {timestamps: true})

const notificationModel = mongoose.model("Notification", notificationSchema)

export default notificationModel