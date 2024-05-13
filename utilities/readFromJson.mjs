import ErrorResponse from "./ErrorResponseModel.mjs";
import { readFileAsync } from "./fileHandler.mjs";

export const readUnityNetData = async () => {
    try {
        const unityNetData = await readFileAsync('logs', 'unityNet.json');
        return JSON.parse(unityNetData);
    } catch (error) {

        throw new ErrorResponse(`Failed to read the data from the JSON file ${error.message}`, 500);
    }
}