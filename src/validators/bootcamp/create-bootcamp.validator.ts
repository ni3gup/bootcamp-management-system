import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateBootcampValidator {
    @IsNotEmpty({
        message: 'Name is required'
    })
    name: string

    @IsNotEmpty()
    description: string

    @IsString()
    @IsOptional()
    website?: string

    @IsNotEmpty()
    @IsString()
    mobile: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    address: string

    @IsNotEmpty()
    @IsArray()
    career: ['Web Development', 'Mobile Development', 'UI/UX', 'Data Science', 'Business', 'Other']

    @IsString()
    @IsOptional()
    other_career_name?: string

    @IsBoolean()
    housing?: boolean

    @IsBoolean()
    job_assistance?: boolean

    @IsBoolean()
    job_guarantee?: boolean

    @IsBoolean()
    accept_gi?: boolean
}