import * as path from "path";

export const DATABASE_FILE = {
    path: path.join(__dirname, '../..', 'src/database/database.txt'),
    filesFolderPath: path.join(__dirname, '../../src/database/files/')
}

export const MESSAGE = {
    successUpload: 'Успешная загрузка файла.',
    errorUpload: 'Произошла ошибка при загрузке файла.',
    errorGetFilesList: 'Произошла ошибка при получение списка файлов.',
    errorGetOneFile: 'Произошла ошибка при получение файла с идентификатором: '
}

export const HTTP_STATUS = {
    ok: 200,
    bad_request: 404
}