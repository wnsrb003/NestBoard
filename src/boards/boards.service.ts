import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { abort } from 'process';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[]{
        if (!this.boards.length) throw new NotFoundException('없어');
        return this.boards;
    }

    getBoardById(id: string): Board{
        const aBoard = this.boards.find((aBoard) => aBoard.id === id)
        if (!aBoard) throw new NotFoundException('찾을 수 없어');
        return aBoard;
    }

    createBoard(createBoardDto: CreateBoardDto): Board{
        const {title, description} = createBoardDto;
        
        const newBoard: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        };

        this.boards.push(newBoard);
        return newBoard;
    }

    deleteBoard(id: string): void{
        const aBoard = this.getBoardById(id);
        if (!aBoard) throw new NotFoundException('삭제하려는 게시물이 없어');
        this.boards = this.boards.filter((aBoard) => aBoard.id !== id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board{
        const aBoard = this.getBoardById(id);
        aBoard.status = status;
        return aBoard;
    }
}
