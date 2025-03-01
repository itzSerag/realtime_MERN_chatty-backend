import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule, // Import ConfigModule to make ConfigService available
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule here as well
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), // Access JWT_SECRET from environment variables
        signOptions: {
          // DEF is 7 days
          expiresIn: configService.get<string>('JWT_EXPIRE'),
        },
      }),
      inject: [ConfigService], // Inject ConfigService into the useFactory function
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule { }