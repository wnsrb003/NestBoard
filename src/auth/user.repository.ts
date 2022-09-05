import { ConflictException } from "@nestjs/common";
import { AuthCredentialDto} from "src/auth/dto/auth-credential.dto";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(AuthCredentialDto: AuthCredentialDto): Promise<void> {
        const {username, password} = AuthCredentialDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ username, password: hashedPassword });

        try{
            await this.save(user);
        }catch (e){
            if (e.code === '23505') throw new ConflictException('같은 이름이 존재해.')
        }
    }

}