import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { abort } from 'process';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[]{
        return this.boards;
    }

    getBoardById(id: string): Board{
        return this.boards.find((aBoard) => aBoard.id === id)
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
        this.boards = this.boards.filter((aBoard) => aBoard.id !== id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board{
        const aBoard = this.getBoardById(id);
        aBoard.status = status;
        return aBoard;
    }
}
