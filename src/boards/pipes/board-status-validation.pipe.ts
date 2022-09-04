import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../boards.model";

export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOption = [
        BoardStatus.PUBLIC,
        BoardStatus.PRIVATE
    ]

    transform(value: any, metadata: ArgumentMetadata){
        console.log(`value : ${JSON.stringify(value)}, metadata: ${JSON.stringify(metadata)}`);
        // value는 대문자로 치환
        value = value.toUpperCase();
        // 상태는 PUBLIC OR PRIVATE
        if (!this.isValidStatus(value)) throw new BadRequestException('잘못된 상태값입니다.');
        return value;
    }

    private isValidStatus(v: any){
        const flag = this.StatusOption.indexOf(v);
        return flag !== -1;
    }
}