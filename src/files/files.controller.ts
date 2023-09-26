import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseInterceptors,
    UploadedFile,
    ParseFilePipeBuilder, UsePipes, ValidationPipe
} from '@nestjs/common';
import {FilesService} from './files.service';
import {CreateFileDto} from './dto/fileCreate.dto';
import {FileInterceptor} from '@nestjs/platform-express'
import {
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiConsumes,
    ApiBody,
    ApiOkResponse
} from "@nestjs/swagger";
import {HTTP_STATUS, MESSAGE} from "../config/config";
import {FileInfoDto} from './dto/fileInfo.dto'

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {
    }

    @Post()
    @ApiOperation({summary: 'Загрузка файла.'})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                fileTitle: {
                    description: "Название файла",
                    example: 'Классный файл',
                    nullable: false,
                    type: 'string',
                    minimum: 16,
                    maximum: 128 },
                fileDescription: {
                    description: "Описание файла",
                    example: 'Супер крутое описание, самого классного файла.',
                    nullable: false,
                    type: 'string',
                    minimum: 16,
                    maximum: 1024},
                category: {
                    description: "Категории файла",
                    example: 'Машины, Город, Архитектура',
                    nullable: false,
                    type: 'string',
                    minimum: 0,
                    maximum: 32},
                files: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('files'))
    @UsePipes(new ValidationPipe())
    async create(@Body() body: CreateFileDto,
           @UploadedFile(
               new ParseFilePipeBuilder()
                   .addMaxSizeValidator({
                       maxSize: 1024*1024*500
                   })
                   .build({
                       fileIsRequired: true,
                   }),
           )
               file?: Express.Multer.File,
    ) {
        return this.filesService.create(body, file);
    }

    @Get()
    @ApiOperation({summary: 'Получение списка загруженных файлов.'})
    @ApiOkResponse({ status: HTTP_STATUS.ok, description: "Успешно", type: CreateFileDto})
    @ApiResponse({ status: HTTP_STATUS.bad_request, description: MESSAGE.errorGetFilesList })
    async findAll() {
        return this.filesService.getAllFiles();
    }

    @Get(':id')
    @ApiOperation({summary: 'Получение информацию о загруженном файле'})
    @ApiParam({ name: "id", required: true, description: "Идентификатор файла" })
    @ApiOkResponse({ status: HTTP_STATUS.ok, description: "Успешно", type: FileInfoDto})
    @ApiResponse({ status: HTTP_STATUS.bad_request, description: MESSAGE.errorGetOneFile + '123' })
    async getOneFile(@Param('id') id: string){
        return this.filesService.getOneFile(id)
    }
}
