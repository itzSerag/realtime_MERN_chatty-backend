import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepo } from "src/core/database";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MessageDocument } from "./model/message.schema";

@Injectable()
export class MessageRepo extends AbstractRepo<MessageDocument> {
    protected readonly logger = new Logger(MessageRepo.name);

    constructor(
        @InjectModel(MessageDocument.name) messageModel: Model<MessageDocument>,
    ) {
        super(messageModel);
    }
}
