export default class Block {
    constructor(timestamp, blockIndex, prevBlockHash, currBlockHash, data) {
        this.timestamp = timestamp;
        this.blockIndex = blockIndex;
        this.prevBlockHash = prevBlockHash;
        this.currBlockHash = currBlockHash;
        this.data = data;
    }
}