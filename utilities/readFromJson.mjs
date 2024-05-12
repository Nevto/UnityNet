import { readFileAsync } from "./fileHandler.mjs";

export const readUnityNetData = async () => {
    try {
        const unityNetData = await readFileAsync('logs', 'unityNet.json');
        return JSON.parse(unityNetData);
    } catch (error) {
        // Handle file read or parsing errors
        throw new Error('Failed to read UnityNet data: ' + error.message);
    }
};