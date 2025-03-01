import { Module } from "@nestjs/common";
import { DatabaseModule } from "./core/database/database.module";
import { ConfigModule } from "./core/config/config.module";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from "@nestjs/jwt";
import { MessageModule } from './modules/message/message.module';
import { CloudinaryModule } from './core/cloudinary/cloudinary.module';
import { SocketModule } from './socket/socket.module';
import { AppController } from './app.controller';

@Module({
  imports: [DatabaseModule, ConfigModule, UserModule, AuthModule, JwtModule, MessageModule, CloudinaryModule, SocketModule],
  controllers: [AppController],
})
export class AppModule { }
