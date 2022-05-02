import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class UpdateProfileValidator {
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    name: string
}