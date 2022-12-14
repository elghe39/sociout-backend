import { addFriend, existFriend, findFriend, getFriendList, deleteFriendList } from "../service/friend.service.js"
import { findRequest } from "../service/friendRequest.service.js"

export async function addFriendHandler(req, res) {
    const sendId = req.body.sendId
    const receiveId = req.body.userId
    try {
        await existFriend(sendId, receiveId)
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
    const sendId = req.body.sendId
    const receiveId = req.body.userId
    try {
        const friend = await findFriend(sendId, receiveId)

        await deleteFriendList(sendId, receiveId)
        await friend.delete()

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

export async function getFriendListHandler(req, res) {
    const userId = req.body.sendId
    try {
        const friendList = await getFriendList(userId)

        return res.status(200).send({
            success: true,
            message: 'Get friend list successfuly',
            friendList: friendList
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.mesasge
        })
    }
}