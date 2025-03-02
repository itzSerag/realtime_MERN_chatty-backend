import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../../user/user.service";
import { ITokenPayload } from "../interface/token-payload.interface";
import { log } from "console";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request?.cookies?.Authentication,
            ]),
            secretOrKey: configService.get('JWT_SECRET'),
        })
    }

    // we extract the _id from the payload
    async validate({ _id }: ITokenPayload) {
        log('im getting the user')
        log(_id)
        return this.userService.findOneById(_id);
    }
}