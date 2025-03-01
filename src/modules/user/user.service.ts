import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepo } from "./user.repo";
import * as bcrypt from 'bcrypt'
import { log } from "console";
import { UserDocument } from "./model/user.schema";
import { CloudinaryService } from "src/core/cloudinary/cloudinary.service";

@Injectable()
export class UserService {
    
    constructor(
        private readonly userRepo: UserRepo,
        private readonly cloudinaryService: CloudinaryService) {

    }


   

    // VALIDATE
    async validateUser(email: string, password: string) {

        const user = await this.findOne(email);
        if (!user) {
            throw new NotFoundException("Email or Password is not found")
        }

        const comparePasswords = await bcrypt.compare(password, user.password);
        if (!comparePasswords) {
            throw new NotFoundException("Email or Password is not found")
        }

        log(user)
        return user;
    }


    // CRUDS
    async create(createUserDto: CreateUserDto) {
        return await this.userRepo.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10)
        });
    }

    async findAll() {
        return this.userRepo.find({});
    }

    async findOneById(_id: string) {
        return this.userRepo.findOne({ _id })
    }

    async findOne(email: string) {
        return this.userRepo.findOne({ email });
    }


    async update(_id: string, updateUserDto: UpdateUserDto) {
        return this.userRepo.findOneAndUpdate({ _id }, { $set: updateUserDto });
    }

    async remove(_id: string) {
        return this.userRepo.findOneAndDelete({ _id });
    }

    async findAllExcept(_id: string) {
        return this.userRepo.findAllExcept({ _id })
    }


    // UPDATE
    async updateProfileImg(user: UserDocument, base64Img: string) {

        const secure_url = await this.cloudinaryService.uploadProfileImg(String(user._id), base64Img)
        // Update the user's profile image URL in the database
        const updatedUser = await this.userRepo.findOneAndUpdate(
            { _id: user._id },
            { imgUrl: secure_url },
        );
        return updatedUser;
    }

}

