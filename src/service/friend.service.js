import { findUserById } from "./user.service.js"
import friendModel from './../model/friend.model.js'
import { declineRequest } from "./friendRequest.service.js"

export function findFriend(sendId, receiveId) {
    const friend = friendModel.findOne({$or:[{
        firstUserId: sendId,
        secondUserId: receiveId
    }, {
        firstUserId: receiveId,
        secondUserId: sendId
    }]})
    if (!friend) {
        throw new Error('Not friend')
    }
    return friend
}

export function existFriend(sendId, receiveId) {
    const friend = friendModel.findOne({$or:[{
        firstUserId: sendId,
        secondUserId: receiveId
    }, {
        firstUserId: receiveId,
        secondUserId: sendId
    }]})
    if (friend) {
        throw new Error('Friend have already exist')
    }
}

function addFriendList(user, friend) {
    user.friendList.push({
        userId: friend._id,
        firstName: friend.firstName,
        lastName: friend.lastName,
        avatar: friend.avatar,
    })
}

export async function addFriend(sendId, receiveId) {
    const sendUser = await findUserById(sendId)
    const receiveUser = await findUserById(receiveId)

    await friend.create({
        firstUserId: sendId,
        secondUserId: receiveId
    })

    addFriendList(sendUser, receiveUser)
    addFriendList(receiveUser, sendUser)

    await declineRequest(sendId, receiveId)
    await sendUser.save()
    await receiveUser.save()
}

export async function deleteFriendList(userId, friendId) {
    const user = await findUserById(userId)
    
    user.friendList.filter(({ userId }) => userId != friendId)
    user.save()
}

export async function deleteFriend(sendId, receiveId) {
    await deleteFriendList(friend.firstUserId, friend.secondUserId)
    await deleteFriendList(friend.secondUserId, friend.firstUserId)

    friend.delete()
}

export async function getFriendList(userId) {
    let list = []
    
    let friendList = await friendModel.find({ firstUserId: userId })
    friendList.forEach(({ secondUserId }) => list.push(secondUserId))

    friendList = await friendModel.find({ secondUserId: userId })
    friendList.forEach(({ firstUserId }) => list.push(firstUserId))

    return list
}