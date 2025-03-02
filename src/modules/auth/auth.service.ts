import { Injectable } from '@nestjs/common';
import { UserDocument } from '../user/model/user.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ITokenPayload } from './interface/token-payload.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async signup(createUserDto: CreateUserDto, response: Response) {
        const user = await this.userService.create(createUserDto);
        this.setAuthCookie(user, response);
        delete user.password
        return user;
    }

    login(user: UserDocument, response: Response): void {
        this.setAuthCookie(user, response);
    }

    private setAuthCookie(user: UserDocument, response: Response): void {
        const tokenPayload: ITokenPayload = {
            _id: String(user._id),
            role: user.role,
        };

        const { token, expires } = this.createToken(tokenPayload);

        response.cookie('Authentication', token, {
            httpOnly: true,
            secure: this.configService.get('NODE_ENV') === 'production', // Only send over HTTPS in production
            sameSite: 'strict', // Prevent CSRF attacks
            expires,
        });
    }

    private createToken(payload: ITokenPayload): { token: string; expires: Date } {
        const jwtExpire = this.configService.get('JWT_EXPIRE') || '7d';
        const expiresInMs = ms(jwtExpire);
        const expires = new Date(Date.now() + expiresInMs);

        const token = this.jwtService.sign(payload, {
            expiresIn: jwtExpire,
        });

        return { token, expires };
    }
}