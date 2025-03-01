import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { AllExceptionsFilter } from "./core/errors/errors.global.filter";
import * as bodyParser from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

dotenv.config({ path: process.cwd() });

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors({
        origin: '*',
        credentials: true,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        preflightContinue: false,
    });

    app.enableVersioning({
        type: VersioningType.URI,
    });

    app.use(bodyParser.json({ limit: '10mb' }));
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
    app.use(cookieParser());

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: false,
        }),
    );

    app.setGlobalPrefix("api");
    app.useGlobalFilters(new AllExceptionsFilter());

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();