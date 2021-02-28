import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { Types } from "mongoose";

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, Types.ObjectId> {
    transform(value: any,metadata: ArgumentMetadata): Types.ObjectId {
        try {
            const validObjectId = Types.ObjectId.isValid(value);

        if (!validObjectId) {
            throw new BadRequestException('Invalid ObjectId');
        }

        return Types.ObjectId.createFromHexString(value);
        } catch (error) {
            throw new BadRequestException('Validation failed (valid ObjectId is expected)');
        }
    }
}