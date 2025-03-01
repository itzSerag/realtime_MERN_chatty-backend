import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import * as Joi from "joi";

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                MONGO_URI: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                CLOUDINARY_CLOUD_NAME: Joi.string().required(),
                CLOUDINARY_API_KEY: Joi.string().required(),
                CLOUDINARY_API_SECRET: Joi.string().required(),
            }),
        }),

    ],
})
export class ConfigModule { }

// joi for schema validation
