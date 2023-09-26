import {ApiProperty} from "@nestjs/swagger";

export class FileInfoDto{
    @ApiProperty({
        description: "Оригинальное название файла",
        nullable: false,
        type: 'string'})
    originalname: string;

    @ApiProperty({
        description: "Кодировка файла",
        nullable: false,
        type: 'string'})
    encoding: string;

    @ApiProperty({
        description: "MIME type файла",
        nullable: false,
        type: 'string'})
    mimetype: string;

    @ApiProperty({
        description: "Буфер",
        nullable: false,
        type: 'BufferSource'})
    buffer: BufferSource;

    @ApiProperty({
        description: "Исходный размер файла",
        nullable: false,
        type: 'number'})
    size: number;
}