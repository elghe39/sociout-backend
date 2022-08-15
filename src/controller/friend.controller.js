import { addFriend, deleteFriend } from "../service/friend.service.js"
import { findRequest } from "../service/friendRequest.service.js"

export async function addFriendHandler(req, res) {
    const sendId = req.body.userId
    const receiveId = req.params.userId
    try {
        await findRequest(receiveId, sendId)

        await addFriend(sendId, receiveId)

        return res.status(200).send({
            success: true,
            message: 'Add friend successfully'
        })        
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.message
        })
    }
} 

export async function deleteFriendHandler(req, res) {
    const sendId = req.body.userId
    const receiveId = req.params.userId
    try {
        await deleteFriend(sendId, receiveId)

        return res.status(200).send({
            success: true,
            message: 'Delete friend successfully'
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.message
        })
    }
}