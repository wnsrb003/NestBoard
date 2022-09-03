import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service'

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService){}
    @Get()
    getAll(): number {
        return 1;
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
