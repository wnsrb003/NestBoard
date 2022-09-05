import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { title } from 'process';
import { BoardStatus } from './boards-status.enum';
import { Board } from './boards.entity';
import { BoardsService } from './boards.service'
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService){}
    
    // @Get('/')
    // getAllBoard(): Board[]{
    //     return this.boardsService.getAllBoards();
    // }
    @Get('/')
    getAllBoard(): Promise<Board[]>{
        return this.boardsService.getAllBoards();
    }

    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board{
    //     return this.boardsService.getBoardById(id);
    // }
    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board>{
        return this.boardsService.getBoardById(id);
    }

    // @Post('/')
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() createBoardDto: CreateBoardDto) {
    //     return this.boardsService.createBoard(createBoardDto);
    // }
    @Post('/')
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto);
    }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void{
    //     return this.boardsService.deleteBoard(id)
    // }
    @Delete('/:id')
    deleteBoard(@Param('id') id: number): Promise<void>{
        return this.boardsService.deleteBoard(id)
    }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string, 
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus): Board{
    //     return this.boardsService.updateBoardStatus(id, status);
    // }
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id: number, 
        @Body('status', BoardStatusValidationPipe) status: BoardStatus): Promise<Board>{
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
