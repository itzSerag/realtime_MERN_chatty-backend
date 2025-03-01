import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {

    async uploadProfileImg(userId: string, base64Img: string): Promise<string> {
        const res = await cloudinary.uploader.upload(base64Img, {
            folder: 'Profile-Img',
            resource_type: 'image',
            overwrite: true,
            public_id: `${userId}_profileImg`
        });

        return res.secure_url;
    }

    async uploadChatImg(base64Img: string, senderId: string, receiverId: string): Promise<string> {
        if (!base64Img) return;

        const res = await cloudinary.uploader.upload(base64Img, {
            folder: 'Chat-Img',
            resource_type: 'image',
            overwrite: true,
            public_id: `${senderId}_chatImg_${receiverId}`
        });

        return res.secure_url;
    }
}