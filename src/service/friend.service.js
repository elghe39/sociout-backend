import { findUserById } from "./user.service.js"
import friendModel from './../model/friend.model.js'
import { declineRequest } from "./friendRequest.service.js"

export async function findFriend(sendId, receiveId) {
    const friend = await friendModel.findOne({$or:[{
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

export async function existFriend(sendId, receiveId) {
    const friend = await friendModel.findOne({$or:[{
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

    await friendModel.create({
        firstUserId: sendId,
        secondUserId: receiveId
    })

    addFriendList(sendUser, receiveUser)
    addFriendList(receiveUser, sendUser)

    await declineRequest(sendId, receiveId)
    await sendUser.save()
    await receiveUser.save()
}

// export async function deleteFriendList(userId, friendId) {
//     const user = await findUserById(userId)
//     console.log(user)
//     user.friendList = user.friendList.filter(({ userId }) => userId != friendId)
//     console.log(user.friendList)
//     await user.save()
// }

export async function deleteFriendList(sendId, receiveId) {
    const sendUser = await findUserById(sendId)
    const receiveUser = await findUserById(receiveId)

    sendUser.friendList = sendUser.friendList.filter(({ userId }) => userId != receiveId)
    receiveUser.friendList = receiveUser.friendList.filter(({ userId }) => userId != sendId)

    await sendUser.save()
    await receiveUser.save()
}

export async function getFriendList(userId) {
    const user = await findUserById(userId)

    return user.friendList
}