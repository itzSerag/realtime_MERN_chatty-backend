import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepo } from "./../../../src/core/database";
import { UserDocument } from "./model/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserRepo extends AbstractRepo<UserDocument> {
    protected readonly logger = new Logger(UserRepo.name);



    constructor(
        @InjectModel(UserDocument.name) userModel: Model<UserDocument>,
    ) {
        super(userModel);
    }
}
