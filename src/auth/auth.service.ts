import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private UserRepository: UserRepository,
        private jwtService: JwtService
    ) {}
    
    async signUp(AuthCredentialDto: AuthCredentialDto): Promise<void>{
        return await this.UserRepository.createUser(AuthCredentialDto);
    }

    async signIn(AuthCredentialDto: AuthCredentialDto): Promise<{accessToken: string}>{
        const {username, password} = AuthCredentialDto;
        const user = await this.UserRepository.findOne({username});

        if (user && (await bcrypt.compare(password, user.password))){
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken: accessToken };
        }
        throw new UnauthorizedException('계정 정보가 맞지 않아');
    }
}
