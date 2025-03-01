import { IsBase64, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMessageDto {

    @IsString()
    @IsNotEmpty()
    text: string

    @IsOptional()
    @IsBase64()
    imageBase64?: string
}
