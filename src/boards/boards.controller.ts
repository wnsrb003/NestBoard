import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { title } from 'process';
import { Board, BoardStatus } from './boards.model';
import { BoardsService } from './boards.service'
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService){}
    
    @Get('/')
    getAllBoard(): Board[]{
        return this.boardsService.getAllBoards();
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board{
        return this.boardsService.getBoardById(id);
    }

    @Post('/')
    createBoard(
        @Body() createBoardDto: CreateBoardDto) {
        return this.boardsService.createBoard(createBoardDto);
    }
    
    @Delete('/:id')
    deleteBoard(@Param('id') id: string): void{
        return this.boardsService.deleteBoard(id)
    }

    @Patch('/:id')
    updateBoardStatus(
        @Param('id') id: string, 
        @Body('status') status: BoardStatus): Board{
        return this.boardsService.updateBoardStatus(id, status);
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
