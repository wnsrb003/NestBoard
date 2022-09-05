import { TypeOrmModuleOptions } from "@nestjs/typeorm";
console.log(__dirname+ '/../**/*.entity.js');
export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'board-app',
    // entities: [__dirname + '/../**/*.entity.js'],
    entities: ["dist/boards/boards.entity.js"],
    synchronize: true,
}
