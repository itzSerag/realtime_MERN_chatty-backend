import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RolesGuard } from "../auth/guards/roles.guard";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { Role } from "./enums/role.enum";
import { Roles } from "../auth/decorators/roles.decorator";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { UserDocument } from "./model/user.schema";
import { FileInterceptor } from "@nestjs/platform-express";
import * as multer from 'multer'
import { log } from "console";


// MUST user auth guard before roles guard MUST
// to extract the user from the cookie so its defined in the context
@UseGuards(JwtAuthGuard)
@Controller({ path: "users", version: "1" })
export class UserController {
    constructor(private readonly userService: UserService) { }


    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.userService.findOne(id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.userService.remove(id);
    }

    @Post('sub-admin')
    async createSubAdmin() { }


    @Patch('/profile/updateImg')
    async updateProfileImg(
        @CurrentUser() user: UserDocument,
        @Body('imgUrl') base64Img: string
    ) {
        if (!base64Img.startsWith('data:image/')) {
            throw new BadRequestException('Invalid Image Format');
        }
        return await this.userService.updateProfileImg(user, base64Img);
    }

}
