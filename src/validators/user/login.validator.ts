import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class LoginValidator {
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string
}