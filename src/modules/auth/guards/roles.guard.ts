

// CHECK IF THE USER HAS THE ROLES ?
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../user/enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // Get the required roles from the decorator
        const requiredRoles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
        if (!requiredRoles) {
            return true; // No roles are required, allow access
        }

        // Get the user from the request
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new ForbiddenException('You do not have permission to access this resource -- no user provided');
        }

        // Check if the user has the required roles
        const hasRole = requiredRoles.some((role) => user.role.includes(role));
        if (!hasRole) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        return true;
    }
}