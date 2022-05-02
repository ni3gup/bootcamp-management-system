import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class ResetPasswordValidator {
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string
}