import { IsNotEmpty, IsString, Matches, maxLength, MaxLength, minLength, MinLength } from "class-validator";

export class AuthCredentialDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: '비밀번호 영문자, 숫자만 사용하세요'
    })
    password: string;
}