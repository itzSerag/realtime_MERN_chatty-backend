import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { DatabaseModule } from "src/core/database";
import { UserRepo } from "./user.repo";
import { UserDocument, UserSchema } from "./model/user.schema";
import { CloudinaryModule } from "src/core/cloudinary/cloudinary.module";

@Module({
    imports: [
        CloudinaryModule,
        DatabaseModule,
        DatabaseModule.forFeature([
            { name: UserDocument.name, schema: UserSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService, UserRepo],
    exports: [UserService]
})
export class UserModule { }
