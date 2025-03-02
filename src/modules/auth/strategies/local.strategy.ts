import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from "passport-local";
import { UserService } from "../../user/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {

    constructor(private readonly userService: UserService) {
        super({
            usernameField: 'email',
             // Use 'email' instead of 'username'
        });
    }

    async validate(email: string, password: string) {
        const user = await this.userService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }
}
