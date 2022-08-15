import followModel from './../model/follow.model.js'
import { findUserById } from './user.service.js'

export async function addFollow(sendId, receiveId) {
    const sendUser = await findUserById(sendId)
    const receiveUser = await findUserById(receiveId)

    if (!receiveId) {
        throw new Error('User does not exist')
    }

    const follow = new followModel({
        sendId: sendId,
        receiveId: receiveId
    })

    receiveUser.followList.push(follow)

    await follow.save()
    await receiveUser.save()
}