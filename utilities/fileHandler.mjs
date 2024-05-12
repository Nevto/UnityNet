import fs from 'fs';
import path from 'path';
import { writeFile, readFile } from 'fs/promises'

export const writeFileSync = (folderName, fileName, data) => {
    try {
        const filePath = path.join(__appdir, folderName, fileName)
        fs.writeFileSync(filePath, data)
    } catch (error) {
        throw new Error(error.message)
    }
};

export const writeFileAsync = async (folderName, fileName, data) => {
    try {
        const filePath = path.join(__appdir, folderName, fileName)
        console.log(`'Writing to file:' ${filePath}`);
        console.log(`'Data:' ${data}`);
        await writeFile(filePath, data)
    } catch (error) {
        throw new Error(error.message)
    }
}

