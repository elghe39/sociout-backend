import { findUserById } from './user.service.js'
import friendRequestModel from '../model/friendRequest.model.js'

export async function findRequest(sendId, receiveId) {
    const request = await friendRequestModel.findOne({
        sendId: sendId,
        receiveId: receiveId
    })

    if (!request) {
        throw new Error('Friend request does not exist')
    }
    return request
}

export async function existRequest(sendId, receiveId) {
    const existRequest = await friendRequestModel.findOne({
        sendId: sendId,
        receiveId: receiveId
    })
    if (existRequest) {
        throw new Error('Friend request already exists')
    }
}

export async function addRequest(sendId, receiveId) {    
    const receiveUser = await findUserById(receiveId)
    const sendUser = await findUserById(sendId)

    const request = new friendRequestModel({
        sendId: sendId,
        receiveId: receiveId
    })

    receiveUser.requestFriendList.push({
        userId: sendId,
        firstName: sendUser.firstName,
        lastName: sendUser.lastName,
        avatar: sendUser.avatar
    })

    await request.save()
    await receiveUser.save()
}

export async function deleteRequest(sendId, receiveId) {
    const request = await findRequest(sendId, receiveId)
    const receiveUser = await findUserById(receiveId)

    request.delete()

    receiveUser.requestFriendList.filter(({ userId }) => userId != sendId)

    await receiveUser.save()
}

export async function declineRequest(sendId, receiveId) {
    const request = await findRequest(receiveId, sendId)
    const sendUser = await findUserById(sendId)

    request.delete()

    sendUser.requestFriendList.filter(({ userId }) => userId != receiveId)

    await sendUser.save()
}

export async function getRequest(userId) {
    const user = await findUserById(userId)
    return user.requestFriendList
}