import { createHash } from "../utilities/crypto-lib.mjs";
import Block from "./Block.mjs"


export default class UnityNet {
    constructor() {
        this.chain = []
        this.friendNodes = []
        this.nodeUrl = process.argv[3]

        this.createBlock(Date.now(), 0, '0', '0', [])
    }


    createBlock(timestamp, prevHash, hash, data) {
        const block = new Block(
            timestamp,
            this.chain.length + 1,
            prevHash,
            hash,
            data
        );

        this.chain.push(block)
        return block
    }

    getLastBlock() {
        return this.chain.at(-1)
    }

    hashBlock(timestamp, prevHash, currBlockData) {
        const stringToHash = timestamp.toString() + prevHash + JSON.stringify(currBlockData)
        const shaHash = createHash(stringToHash)

        return shaHash
    }

    validateChain(UnityNet) {
        let isValid = true

        for (let i = 1; i < UnityNet.length; i++) {
            const block = UnityNet[i]
            const prevBlock = UnityNet[i - 1]

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
