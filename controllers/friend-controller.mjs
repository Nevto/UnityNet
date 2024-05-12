import { unityNet } from "../starter.mjs";

export const listFriends = (req, res, next) => {
    res.status(200).json({ success: true, data: unityNet.friendNodes })
}

export const registerFriend = (req, res, next) => {
    const node = req.body

    if (
        unityNet.friendNodes.indexOf(node.nodeUrl) === -1 &&
        unityNet.nodeUrl !== node.nodeUrl
    ) {
        unityNet.friendNodes.push(node.nodeUrl)
        syncFriends(node.nodeUrl)
        res.status(201).json({ Message: `Noden ${node.nodeUrl} is a friend`, data: unityNet.friendNodes })
    } else {
        res.status(400).json({ Message: `Noden ${node.nodeUrl} is not a friend`, data: unityNet.friendNodes })
    }
}

const syncFriends = (url) => {
    const friends = [...unityNet.friendNodes, unityNet.nodeUrl]

    try {
        friends.forEach(async (friend) => {
            const body = { nodeUrl: friend }
            await fetch(`${url}/friends/register-friend`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        })
    } catch (error) {
        console.log(error);
    }
} 