import { addFollow, deleteFollow, existFollow, findFollow, getFollowedList, getFollowList } from "../service/follow.service.js"

export async function addFollowHandler(req, res) {
    const sendId = req.body.userId
    const receiveId = req.params.userId
    try {
        await existFollow(sendId, receiveId)
        await addFollow(sendId, receiveId)

        return res.status(200).send({
            success: true,
            message: 'Add follow successfully'
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.message
        })
    }
}

export async function deleteFollowHandler(req, res) {
    const sendId = req.body.userId
    const receiveId = req.params.userId
    try {
        const follow = await findFollow(sendId, receiveId)

        await deleteFollow(follow, sendId, receiveId)

        return res.status(200).send({
            success: true,
            message: 'Delete follow successfully'
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.message
        })
    }
}

export async function getFollowListHandler(req, res) {
    const userId = req.body.userId
    try {
        const list = await getFollowList(userId)

        return res.status(200).send({
            success: true,
            message: 'Get follow list successfully',
            followList: list
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.message
        })
    }
}

export async function getFollowedListHandler(req, res) {
    const userId = req.body.userId
    try {
        const list = await getFollowedList(userId)

        return res.status(200).send({
            success: true,
            message: 'Get followed list successfully',
            followedList: list
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.message
        })
    }
}

export async function getUserFollowListHandler(req, res) {
    const userId = req.params.userId
    try {
        const list = await getFollowList(userId)

        return res.status(200).send({
            success: true,
            message: 'Get user follow list successfully',
            followList: list
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.message
        })
    }
}