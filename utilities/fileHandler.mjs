
import path from 'path';
import { writeFile, readFile, } from 'fs/promises'


export const writeFileAsync = async (folderName, fileName, data) => {
    try {
        const filePath = path.join(__appdir, folderName, fileName)
        // console.log(`'Writing to file:' ${filePath}`);
        // console.log(`'Data:' ${data}`);
        await writeFile(filePath, data + '\n')
        console.log(`Data written to file ${filePath} successfully.`)
    } catch (error) {
        throw new Error(error.message)
    }
}

export const readFileAsync = async (folderName, fileName) => {
    try {
        const filePath = path.join(__appdir, folderName, fileName);
        const data = await readFile(filePath, 'utf-8');
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}


