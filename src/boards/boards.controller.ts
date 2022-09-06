import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { use } from 'passport';
import { title } from 'process';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { BoardStatus } from './boards-status.enum';
import { Board } from './boards.entity';
import { BoardsService } from './boards.service'
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('BoardController');
    constructor(private boardsService: BoardsService){}
    
    // @Get('/')
    // getAllBoard(): Board[]{
    //     return this.boardsService.getAllBoards();
    // }
    @Get('/')
    getAllBoard(): Promise<Board[]>{
        return this.boardsService.getAllBoards();
    }

    @Get('/me')
    getMyBoard(@GetUser() user: User): Promise<Board[]>{
        this.logger.verbose(`User ${user.username} try to get myBoard`);
        return this.boardsService.getMyBoards(user);

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
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User): Promise<Board> 
    {
        this.logger.verbose(`User ${user.username} try to create Board, Payload : ${JSON.stringify(createBoardDto)}`);
        return this.boardsService.createBoard(createBoardDto, user);
    }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void{
    //     return this.boardsService.deleteBoard(id)
    // }
    @Delete('/:id')
    deleteBoard(@Param('id') id: number, @GetUser() user: User): Promise<void>{
        return this.boardsService.deleteBoard(id, user);
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
