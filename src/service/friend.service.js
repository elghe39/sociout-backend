import { findUserById } from "./user.service.js"
import friendModel from './../model/friend.model.js'
import { declineRequest } from "./friendRequest.service.js"

export function findFriend(sendId, receiveId) {
    return friendModel.findOne({$or:[{
        firstUserId: sendId,
        secondUserId: receiveId
    }, {
        firstUserId: receiveId,
        secondUserId: sendId
    }]})
}

export async function addFriend(sendId, receiveId) {
    const sendUser = await findUserById(sendId)
    const receiveUser = await findUserById(receiveId)

    const friend = new friendModel({
        firstUserId: sendId,
        secondUserId: receiveId
    })

    sendUser.friendList.push(friend)
    receiveUser.friendList.push(friend)

    await declineRequest(sendId, receiveId)
    await friend.save()
    await sendUser.save()
    await receiveUser.save()
}

export async function deleteFriendList(userId, friendId) {
    const user = await findUserById(userId)

    const index = user.friendList.findIndex((id) => id === friendId)
    user.friendList.splice(index, 1)

    user.save()
}

export async function deleteFriend(sendId, receiveId) {
    const friend = await findFriend(sendId, receiveId)
    if (!friend) {
        throw new Error('Not friend')
    }
    friend.delete()

    await deleteFriendList(sendId, friend._id)
    await deleteFriendList(receiveId, friend._id)
}

export async function getFriendList(userId) {
    let list = []
    
    let friendList = await friendModel.find({ firstUserId: userId })
    friendList.forEach(({ secondUserId }) => list.push(secondUserId))

    friendList = await friendModel.find({ secondUserId: userId })
    friendList.forEach(({ firstUserId }) => list.push(firstUserId))

    return list
}