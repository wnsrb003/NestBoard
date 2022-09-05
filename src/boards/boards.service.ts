import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards-status.enum';
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './boards.entity';
import { BoardsRepository } from './boards.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardsRepository)
        private boardsRepository: BoardsRepository
    ) {}
    
    // private boards: Board[] = [];

    // getAllBoards(): Board[]{
    //     if (!this.boards.length) throw new NotFoundException('없어');
    //     return this.boards;
    // }
    async getAllBoards(): Promise<Board[]>{
        const found = await this.boardsRepository.find();
        if (!found) throw new NotFoundException('없어');
        return found;
    }

    // getBoardById(id: string): Board{
    //     const aBoard = this.boards.find((aBoard) => aBoard.id === id)
    //     if (!aBoard) throw new NotFoundException('찾을 수 없어');
    //     return aBoard;
    // }
    async getBoardById(id: number): Promise <Board>{
        const found = await this.boardsRepository.findOne(id);
        
        if (!found) throw new NotFoundException('못찾았어요');
        return found;
    }
    // async createBoard(createBoardDto: CreateBoardDto){
    //     const {title, description} = createBoardDto;
        
    //     const newBoard: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     };

    //     this.boards.push(newBoard);
    //     return newBoard;
    // }
    async createBoard(createBoardDto: CreateBoardDto): Promise<Board>{
        const {title, description} = createBoardDto;
        const newBoard = this.boardsRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })

        await this.boardsRepository.save(newBoard);
        return newBoard;
    }

    // deleteBoard(id: string): void{
    //     const aBoard = this.getBoardById(id);
    //     if (!aBoard) throw new NotFoundException('삭제하려는 게시물이 없어');
    //     this.boards = this.boards.filter((aBoard) => aBoard.id !== id);
    // }
    async deleteBoard(id: number): Promise<void>{
        const found = await this.boardsRepository.delete(id);
        if (!found.affected) throw new NotFoundException('삭제하려는 게시물이 없어');
    }

    // updateBoardStatus(id: string, status: BoardStatus): Board{
    //     const aBoard = this.getBoardById(id);
    //     aBoard.status = status;
    //     return aBoard;
    // }
    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board>{
        const found = await this.getBoardById(id);
        if (!found) throw new NotFoundException('수정하려는 게시물이 없어');
        found.status = status;
        const result = await this.boardsRepository.save(found)
        return result;
    }
}
