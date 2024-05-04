import { unityNet } from "../starter.mjs";

export const loadUnityNet = (req, res, next) => {
    res.status(200).json({ success: true, data: unityNet })
}