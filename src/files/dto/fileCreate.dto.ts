import {IsNotEmpty, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateFileDto {
    @ApiProperty({
        description: "Название файла",
        example: 'Классный файл',
        nullable: false,
        type: 'string',
        minimum: 16,
        maximum: 128})
    @IsNotEmpty()
    @Length(16, 128)
    fileTitle: string;

    @ApiProperty({
        description: "Описание файла",
        example: 'Супер крутое описание, самого классного файла.',
        nullable: false,
        type: 'string',
        minimum: 16,
        maximum: 1024})
    @IsNotEmpty()
    @Length(16, 1024)
    fileDescription: string

    @ApiProperty({
        description: "Категории файла",
        example: 'Машины, Город, Архитектура',
        nullable: false,
        type: 'string',
        minimum: 0,
        maximum: 32})
    @IsNotEmpty()
    @Length(0, 32)
    category: string;

    @ApiProperty({
        description: "Идентификатор файла",
        example: '123123123',
        nullable: true,
        type: 'number'})
    fileId: number
}
