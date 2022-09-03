import { Body, Controller, Get, Post } from '@nestjs/common';
import { title } from 'process';
import { Board } from './boards.model';
import { BoardsService } from './boards.service'
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService){}
    
    @Get('/')
    getAllBoard(): Board[]{
        return this.boardsService.getAllBoards();
    }

    @Post('/')
    createBoard(
        @Body() createBoardDto: CreateBoardDto) {
        return this.boardsService.createBoard(createBoardDto);
    }
    
}
// export class BoardsController {
//     boardsService: BoardsService;

//     constructor( boardsService: BoardsService) {
//         this.boardsService = boardsService;
//     }

//     @Get()
//     getAll(): number {
//         return 1;
//     }
// }
