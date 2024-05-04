import Block from "./Block.mjs"

export default class UnityNet {
    constructor() {
        this.chain = []
        this.noders = []
        this.nodeUrl = process.env.NODE_URL
    }


    createBlock(timestamp, blockIndex, prevBlockHash, currBlockHash, data) {
        const block = new Block(
            timestamp,
            blockIndex,
            prevBlockHash,
            currBlockHash,
            data
        );

        this.chain.push(block)
        return block
    }
}
