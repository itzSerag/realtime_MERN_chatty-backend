import { Module } from '@nestjs/common';
import { WebSocketsGateway } from './socket.provider';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [ConfigModule, JwtModule],
    providers: [WebSocketsGateway],
    exports: [WebSocketsGateway]
})
export class SocketModule { }
