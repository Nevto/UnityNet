import { createHash } from "../utilities/crypto-lib.mjs";
import Block from "./Block.mjs"

export default class UnityNet {
    constructor() {
        this.chain = []
        this.friendNodes = []
        this.nodeUrl = process.argv[3]

        this.createBlock(Date.now(), '0', '0', [], 1666, process.env.DIFFICULTY_LEVEL)
    }


    createBlock(timestamp, prevHash, hash, data, nonce, difficulty) {
        const block = new Block(
            timestamp,
            this.chain.length + 1,
            prevHash,
            hash,
            data,
            nonce,
            difficulty
        );

        this.chain.push(block)
        return block
    }

    getLastBlock() {
        return this.chain.at(-1)
    }

    hashBlock(timestamp, prevHash, currBlockData, nonce, difficulty) {
        const stringToHash = timestamp.toString() + prevHash + JSON.stringify(currBlockData)
            + nonce + difficulty
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
                block.data,
                block.nonce,
                block.difficulty
            )
            if (hash !== block.hash) isValid = false
            if (block.prevHash !== prevBlock.hash) isValid = false
        }
        return isValid
    }

    proofOfWork(prevBlockHash, data) {
        const lastBlock = this.getLastBlock()
        let difficulty, hash, timestamp
        let nonce = 0

        do {
            nonce++
            timestamp = Date.now()

            difficulty = this.difficultyAdjustment(lastBlock, timestamp)
            hash = this.hashBlock(timestamp, prevBlockHash, data, nonce, difficulty)
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty))

        return { nonce, difficulty, timestamp }
    }

    difficultyAdjustment(lastBlock, timestamp) {
        const MINE_RATE = process.env.MINE_RATE;
        let { difficulty } = lastBlock;

        if (difficulty < 1) return 1;

        return timestamp - lastBlock.timestamp > MINE_RATE
            ? +difficulty - 1
            : +difficulty + 1;
    }
}
