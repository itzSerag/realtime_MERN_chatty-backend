import { IsString } from 'class-validator';

export class UpdateProfileImgDto {
    @IsString()
    imgURL: string; // Base64 encoded image or image URL
}