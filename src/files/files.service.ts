import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/fileCreate.dto';
import { FileInfoDto } from './dto/fileInfo.dto';
import * as fs from 'fs';
import * as path from 'path';
import { DATABASE_FILE, MESSAGE } from '../config/config';

@Injectable()
export class FilesService {
  /**
   * Метод класса служит для загрузки файла на сервер
   * @param {CreateFileDto} createFileDto     - Сопутствующие данные по файлу
   * @param {FileInfoDto} files               -   Информация о самом файле
   */
  async create(createFileDto: CreateFileDto, files: FileInfoDto) {
    try {
      const fileId = new Date().getTime();
      const fileDatabaseInfo = {
        ...createFileDto,
        fileId: fileId,
      };
      const fileInfo = {
        ...files,
        buffer: files.buffer.toString(),
      };
      /**
       * 1.  Сохранили информацию о полученном файле в БД
       */
      fs.appendFileSync(
        DATABASE_FILE.path,
        JSON.stringify(fileDatabaseInfo) + 'NEXT',
      );
      /**
       * 2. Сохранили информацию о полученном файле
       */
      fs.writeFileSync(
        path.join(DATABASE_FILE.filesFolderPath, String(fileId) + '.txt'),
        JSON.stringify(fileInfo),
      );
      return MESSAGE.successUpload;
    } catch (e) {
      return MESSAGE.errorUpload;
    }
  }

  /**
   * Метод класса служит для получения списка загруженных файлов
   */
  async getAllFiles() {
    try {
      const data = fs.readFileSync(DATABASE_FILE.path).toString('utf-8');
      return data.split('NEXT').map((data) => {
        if (data.length !== 0) {
          return JSON.parse(data);
        }
      });
    } catch (e) {
      return MESSAGE.errorGetFilesList;
    }
  }

  /**
   * Метод класса служит для получения информации о файле
   * @param {String} id Идентификатор файла
   */
  async getOneFile(id: string) {
    try {
      const fileFromDatabase = JSON.parse(
        fs
          .readFileSync(path.join(DATABASE_FILE.filesFolderPath, id + '.txt'))
          .toString('utf-8'),
      );
      return { ...fileFromDatabase, buffer: undefined };
    } catch (e) {
      return MESSAGE.errorGetOneFile + id;
    }
  }
}
