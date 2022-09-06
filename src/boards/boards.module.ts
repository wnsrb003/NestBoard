import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { BoardsController } from './boards.controller';
import { BoardsRepository } from './boards.repository';
import { BoardsService } from './boards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardsRepository]),
    AuthModule
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
