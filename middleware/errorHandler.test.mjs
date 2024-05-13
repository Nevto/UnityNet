import errorHandler from './errorHandler.mjs';
import path from 'path';
import { test, describe, expect } from 'vitest'

global.__appdir = 'D:\Nodejs kurs\UnityNet'

describe('errorHandler should return the correct filepath', () => {
    test('errorHandler file path generation', () => {
        const mockReq = {
            method: 'GET',
            originalUrl: '/test'
        };


        const mockError = new Error('Test error');

        const filePath = path.join(__appdir, 'logs', 'error.log');


        const expectedFilePath = `${__appdir}\\logs\\error.log`;

        expect(filePath).equals(expectedFilePath);
    })
})