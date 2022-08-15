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

export async function deleteRequest(sendId, receiveId) {
    const request = await findRequest(sendId, receiveId)
    request.delete()

    const receiveUser = await findUserById(receiveId)

    const index = receiveUser.requestFriendList.findIndex((id) => id === request._id)
    receiveUser.requestFriendList.splice(index, 1)

    await receiveUser.save()
}

export async function declineRequest(sendId, receiveId) {
    const request = await findRequest(receiveId, sendId)
    request.delete()

    const sendUser = await findUserById(sendId)

    const index = sendUser.requestFriendList.findIndex((id) => id === request._id)
    sendUser.requestFriendList.splice(index, 1)

    await sendUser.save()
}

export async function addRequest(sendId, receiveId) {
    const existRequest = await friendRequestModel.findOne({
        sendId: sendId,
        receiveId: receiveId
    })
    if (existRequest) {
        throw new Error('Friend request already exists')
    }

    const receiveUser = await findUserById(receiveId)

    const request = new friendRequestModel({
        sendId: sendId,
        receiveId: receiveId
    })

    receiveUser.requestFriendList.push(request)

    await request.save()
    await receiveUser.save()
}

export async function getRequest(userId) {
    const requestFriendList = await friendRequestModel.find({receiveId: userId})

    var list = []
    requestFriendList.forEach(({sendId}) => list.push(sendId))

    return list 
}