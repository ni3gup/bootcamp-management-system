import { IsEmail } from "class-validator"

export class ForgotPasswordValidator {
    @IsEmail()
    email: string
}