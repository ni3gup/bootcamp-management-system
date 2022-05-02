import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"

export class RegisterUserValidator {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string

    @IsNotEmpty()
    @IsNumber()
    role_id: number
}