import {  EntityRepository, Repository } from "typeorm";
import { BoardStatus } from "./boards-status.enum";
import { Board } from "./boards.entity";

@EntityRepository(Board)
export class BoardsRepository extends Repository<Board> {
    async getAllBoards(): Promise<Board[]>{
        const query = this.createQueryBuilder('board');
        query.where('board.status = :status', {status: BoardStatus.PUBLIC});
        const boards = await query.getMany()
        return boards;
    }
}
