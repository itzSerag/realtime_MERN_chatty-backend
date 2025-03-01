import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


export class LoginDto {

    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @Length(8, 25)
    password: string
}