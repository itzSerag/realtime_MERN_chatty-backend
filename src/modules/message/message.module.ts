import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MessageRepo } from './message.repo';
import { DatabaseModule } from 'src/core/database';
import { MessageDocument, MessageSchema } from './model/message.schema';
import { CloudinaryModule } from 'src/core/cloudinary/cloudinary.module';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [UserModule, CloudinaryModule, JwtModule, SocketModule, DatabaseModule.forFeature([{
    schema: MessageSchema, name: MessageDocument.name
  }])],
  controllers: [MessageController],
  providers: [MessageService, MessageRepo],
})
export class MessageModule { }
