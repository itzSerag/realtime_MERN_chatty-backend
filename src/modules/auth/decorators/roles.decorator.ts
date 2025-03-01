// src/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from '../../user/enums/role.enum';

export const ROLES_KEY = 'roles';
// now we can set @SetMetaData to specify which route for which
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);