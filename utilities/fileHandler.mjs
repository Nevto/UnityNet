
import path from 'path';
import { writeFile, readFile, } from 'fs/promises'
import ErrorResponse from './ErrorResponseModel.mjs';


export const writeFileAsync = async (folderName, fileName, data) => {
    try {
        const filePath = path.join(__appdir, folderName, fileName)
        await writeFile(filePath, data + '\n')
        console.log(`Data written to file ${filePath} successfully.`)
    } catch (error) {
        throw new ErrorResponse(`Failed to write to file: ${error.message}`, 500,)
    }
}

export const readFileAsync = async (folderName, fileName) => {
    try {
        const filePath = path.join(__appdir, folderName, fileName);
        const data = await readFile(filePath, 'utf-8');
        return data;
    } catch (error) {
        throw new ErrorResponse(`Failed to read file: ${error.message}`, 500)
    }
}


