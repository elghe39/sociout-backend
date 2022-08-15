import { addRequest, declineRequest, deleteRequest, getRequest } from '../service/friendRequest.service.js'

export async function addRequestHandler(req, res) {
    const sendId = req.body.userId
    const receiveId = req.params.userId
    try {
        await addRequest(sendId, receiveId)

        return res.status(200).send({
            success: true,
            message: 'Add friend request successfully'
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.message
        })
    }
}

export async function deleteRequestHandler(req, res) {
    const sendId = req.body.userId
    const receiveId = req.params.userId
    try {
        await deleteRequest(sendId, receiveId)

        return res.status(200).send({
            success: true,
            message: 'Delete friend request successfully'
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.message
        })
    }
}

export async function declineRequestHandler(req, res) {
    const sendId = req.body.userId
    const receiveId = req.params.userId
    try {
        await declineRequest(sendId, receiveId)

        return res.status(200).send({
            success: true,
            message: 'Decline friend request successfully'
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.message
        })
    }
}

export async function getRequestHandler(req, res) {
    const userId = req.body.userId
    try {
        const requestFriendList = await getRequest(userId)

        return res.status(200).send({
            success: true,
            requestFriendList: requestFriendList
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.message
        })
    }
}