import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { AllExceptionsFilter } from "./core/errors/errors.global.filter";
import * as bodyParser from 'body-parser';

// Load the appropriate .env file
// TODO : change it to production
const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env';
dotenv.config({ path: envFile });

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable CORS for Vercel
    app.enableCors({
        origin: '*',
        credentials: true,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
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
            transform: true,
        }),
    );

    app.setGlobalPrefix("api");
    app.useGlobalFilters(new AllExceptionsFilter());

    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();