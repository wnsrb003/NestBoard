import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { BoardsRepository } from './boards.repository';
import { BoardsService } from './boards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardsRepository])
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
