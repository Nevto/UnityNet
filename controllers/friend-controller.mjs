import { unityNet } from "../starter.mjs";
import ResponseModel from "../utilities/ResponseModel.mjs";

export const listFriends = (req, res, next) => {
    const responseModel = new ResponseModel({ statusCode: 200, data: unityNet.friendNodes });
    res.status(200).json(responseModel);
}

export const registerFriend = (req, res, next) => {
    const node = req.body;

    if (
        unityNet.friendNodes.indexOf(node.nodeUrl) === -1 &&
        unityNet.nodeUrl !== node.nodeUrl
    ) {
        unityNet.friendNodes.push(node.nodeUrl);
        syncFriends(node.nodeUrl);
        const responseModel = new ResponseModel({ statusCode: 201, data: unityNet.friendNodes, message: `Node ${node.nodeUrl} is now a friend` });
        res.status(201).json(responseModel);
    } else {
        const responseModel = new ResponseModel({ statusCode: 400, data: unityNet.friendNodes, error: `Node ${node.nodeUrl} is already a friend` });
        res.status(400).json(responseModel);
    }
}

const syncFriends = (url) => {
    const friends = [...unityNet.friendNodes, unityNet.nodeUrl];

    try {
        friends.forEach(async (friend) => {
            const body = { nodeUrl: friend };
            await fetch(`${url}/friends/register-friend`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        });
    } catch (error) {
        console.log(error);
    }
}
