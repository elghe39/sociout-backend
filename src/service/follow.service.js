import { validateUserId } from '../middleware/validate.middleware.js'
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

function addFollowingList(sendUser, receiveUser) {
    receiveUser.followingList.push({
        userId: sendUser._id,
        firstName: sendUser.firstName,
        lastName: sendUser.lastName,
        avatar: sendUser.avatar
    })

    receiveUser.save()
}

function addFollowedList(sendUser, receiveUser) {
    sendUser.followedList.push({
        userId: receiveUser._id,
        firstName: receiveUser.firstName,
        lastName: receiveUser.lastName,
        avatar: receiveUser.avatar
    })

    sendUser.save()
}

export async function addFollow(sendId, receiveId) {
    const sendUser = await findUserById(sendId)
    const receiveUser = await findUserById(receiveId)

    const follow = new followModel({
        sendId: sendId,
        receiveId: receiveId
    })

    addFollowingList(sendUser, receiveUser)
    addFollowedList(sendUser, receiveUser)

    follow.save()
}

export async function deleteFollowList(sendId, receiveId) {
    const sendUser = await findUserById(sendId)
    const receiveUser = await findUserById(receiveId)

    sendUser.followedList = sendUser.followedList.filter(({ userId }) => userId != receiveId)
    receiveUser.followingList = receiveUser.followingList.filter(({ userId }) => userId != sendId)

    sendUser.save()
    receiveUser.save()
}

export async function getFollowingList(userId) {
    const user = await findUserById(userId)

    return user.followingList
}

export async function getFollowedList(userId) {
    const user = await findUserById(userId)

    return user.followedList
}