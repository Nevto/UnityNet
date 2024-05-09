import { createHash } from "../utilities/crypto-lib.mjs";
import Block from "./Block.mjs"


export default class UnityNet {
    constructor() {
        this.chain = []
        this.friendNodes = []
        this.nodeUrl = process.env.NODE_URL
    }


    createBlock(timestamp, blockIndex, prevHash, hash, data) {
        const block = new Block(
            timestamp,
            this.chain.length + 1,
            blockIndex,
            prevHash,
            hash,
            data
        );

        this.chain.push(block)
        return block
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1]
    }

    hashBlock(timestamp, prevHash, data) {
        const stringToHash = timestamp.toString() + prevHash + JSON.stringify(data)
        const hash = createHash(stringToHash)

        return hash
    }

    validateChain(UnityNet) {
        let isValid = true

        for (let i = 1; i < UnityNet.chain.length;) {
            const block = UnityNet.chain[i]
            const prevBlock = UnityNet.chain[i - 1]

            const hash = this.hashBlock(
                block.timestamp,
                prevBlock.hash,
                block.data
            )
            if (hash !== block.hash) isValid = false
            if (block.prevHash !== prevBlock.hash) isValid = false
        }
        return isValid
    }
}
