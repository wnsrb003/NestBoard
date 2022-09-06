import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() AuthCredentialDto: AuthCredentialDto): Promise<void>{
        return this.authService.signUp(AuthCredentialDto);
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    siginIn(@Body() AuthCredentialDto: AuthCredentialDto): Promise<{accessToken: string}>{
        return this.authService.signIn(AuthCredentialDto);
    }

    @Post('/auth')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User){
        console.log(user)
    }
}
