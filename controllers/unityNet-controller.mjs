import { unityNet } from "../starter.mjs";

export const loadUnityNet = (req, res, next) => {
    res.status(200).json({ success: true, data: unityNet })
}

export const createBlock = async (req, res, next) => {
    const lastBlock = unityNet.getLastBlock()
    const data = req.body
    const timestamp = Date.now()

    const currBlockHash = unityNet.hashBlock(timestamp, lastBlock.hash, data)

    const block = unityNet.createBlock(timestamp, lastBlock.hash, currBlockHash, data)

    res.status(201).json({ success: true, data: block })
}

export const updateChain = (rec, res, next) => {
    const block = req.body
    const lastBlock = unityNet.getLastBlock()
    const hash = lastBlock.hash === block.prevHash
    const index = lastBlock.blockIndex + 1 === block.blockIndex

    if (hash && index) {
        unityNet.chain.push(block)
        res.status(201).json({ success: true, data: block })
    } else {
        res.status(400).json({ success: false, error: 'Block is invalid' })
    }
}

export const synchronizeChain = (req, res, next) => {
    const currentLength = unityNet.chain.length
    let maxLength = currentLength
    let longestChain = null

    unityNet.friendNodes.forEach(async (friend) => {
        const response = await fetch(`${friend}/api/v1/unityNet`)
        if (response.ok) {
            const result = await response.json()

            if (result.data.chain.length > maxLength) {
                maxLength = result.data.chain.length
                longestChain = result.data.chain
            }

            if (!longestChain || (longestChain && !unityNet.validateChain(longestChain))) {
                console.log('Chain is synced');
            } else {
                unityNet.chain = longestChain
                console.log('Chain is not synced');
            }
        }

    })

    res.status(200).json({ success: true, data: unityNet })
}