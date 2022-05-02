import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class UpdatePasswordValidator {
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    current_password: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    new_password: string
}