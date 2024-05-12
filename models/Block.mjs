export default class Block {
    constructor(timestamp, blockIndex, prevHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.blockIndex = blockIndex;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }
}