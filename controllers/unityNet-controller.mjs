import { unityNet } from "../starter.mjs";
import ErrorResponse from "../utilities/ErrorResponseModel.mjs";
import ResponseModel from "../utilities/ResponseModel.mjs";
import { writeFileAsync, } from "../utilities/fileHandler.mjs";
import { readUnityNetData } from "../utilities/readFromJson.mjs";

export const loadUnityNet = async (req, res, next) => {
    try {
        const responseModel = new ResponseModel({ statusCode: 200, data: unityNet });
        res.status(200).json(responseModel);
    } catch (error) {
        console.error('Error loading unityNet:', error.message);
        const responseModel = new ResponseModel({ statusCode: 500, error: 'Failed to load unityNet' });
        res.status(500).json(responseModel);
    }
}


export const createBlock = async (req, res, next) => {
    await updateUnityNetChain()

    const lastBlock = unityNet.getLastBlock()
    const { nonce, difficulty, timestamp } = unityNet.proofOfWork(lastBlock.hash, req.body)
    const data = req.body

    const currBlockHash = unityNet.hashBlock(timestamp, lastBlock.hash, data, nonce, difficulty)

    const block = unityNet.createBlock(timestamp, lastBlock.hash, currBlockHash, data, nonce, difficulty)


    const updateFriends = unityNet.friendNodes.map((url) => {
        const body = block;

        return fetch(`${url}/unity/update`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    })

    await Promise.all(updateFriends)

    await writeFileAsync('logs', 'unityNet.json', JSON.stringify(unityNet.chain, null, 2))

    const responseModel = new ResponseModel({
        statusCode: 201,
        data: { message: 'Block created and sent to all the other nodes', block }
    });
    res.status(201).json(responseModel);
}


const updateUnityNetChain = async () => {
    try {
        const newUnityNetData = await readUnityNetData()
        unityNet.chain = newUnityNetData;
        console.log('Chain updated successfully.')
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('UnityNet JSON file not found. Skipping chain update.');
            return
        }
    }
}



export const updateChain = (req, res, next) => {

    const block = req.body
    const lastBlock = unityNet.getLastBlock()
    const hash = lastBlock.hash === block.prevHash
    const index = lastBlock.blockIndex + 1 === block.blockIndex

    if (hash && index) {
        unityNet.chain.push(block)
        const responseModel = new ResponseModel({ statusCode: 201, data: block });
        res.status(201).json(responseModel);
    } else {
        const responseModel = new ResponseModel({ statusCode: 400, error: 'Block is invalid' });
        res.status(400).json(responseModel);
    }
}

export const synchronizeChain = (req, res, next) => {
    try {

        const currentLength = unityNet.chain.length
        let maxLength = currentLength
        let longestChain = null

        unityNet.friendNodes.forEach(async (friend) => {
            const response = await fetch(`${friend}/unity`)
            if (response.ok) {
                const result = await response.json()
                console.log(result);
                if (result.data.chain.length > maxLength) {
                    maxLength = result.data.chain.length
                    longestChain = result.data.chain
                }

                if (!longestChain || (longestChain && !unityNet.validateChain(longestChain))) {
                    console.log('Chain is synced')
                } else {
                    unityNet.chain = longestChain
                    console.log('Chain is not synced')
                }
            }

        })
        const responseModel = new ResponseModel({ statusCode: 200, data: unityNet });
        res.status(200).json(responseModel)
    } catch (error) {
        const errorResponse = new ErrorResponse({ statusCode: 500, error: 'Failed to synchronize chain' })
        res.status(500).json(errorResponse)
    }

}