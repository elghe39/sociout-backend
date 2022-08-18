import followModel from './../model/follow.model.js'
import { findUserById } from './user.service.js'

export async function findFollow(sendId, receiveId) {
    const follow = await followModel.findOne({
        sendId: sendId,
        receiveId: receiveId
    })
    if (!follow) {
        throw new Error('Can\'t find follow')
    }
    return follow
}

export async function existFollow(sendId, receiveId) {
    const follow = await followModel.findOne({
        sendId: sendId,
        receiveId: receiveId
    })
    if (follow) {
        throw new Error('You have already followed')
    }
}

export async function addFollow(sendId, receiveId) {
    const sendUser = await findUserById(sendId)
    const receiveUser = await findUserById(receiveId)

    const follow = new followModel({
        sendId: sendId,
        receiveId: receiveId
    })

    receiveUser.followList.push(follow)
    sendUser.followedList.push(follow)

    await follow.save()
    await receiveUser.save()
    await sendUser.save()
}

export async function deleteFollowList(userId, followId) {
    const user = await findUserById(userId)

    const index = user.followList.findIndex((id) => id === followId)
    user.followList.splice(index, 1)

    user.save()
}

export async function deleteFollowedList(userId, followId) {
    const user = await findUserById(userId)

    const index = user.followedList.findIndex((id) => id === followId)
    user.followedList.splice(index, 1)

    user.save()
}

export async function deleteFollow(follow, sendId, receiveId) {
    await deleteFollowedList(sendId, follow._id)
    await deleteFollowList(receiveId, follow._id)
    await follow.delete()
}

export async function getFollowList(userId) {
    const followList = await followModel.find({ receiveId: userId }) 
    let list = []

    followList.forEach(({ sendId }) => list.push(sendId))

    return list
}

export async function getFollowedList(userId) {
    const followedList = await followModel.find({ sendId: userId }) 
    let list = []

    followedList.forEach(({ receiveId }) => list.push(receiveId))

    return list
}