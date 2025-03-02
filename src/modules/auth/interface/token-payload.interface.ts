import { Role } from "../../user/enums/role.enum"

export interface ITokenPayload {
    _id: string;
    role?: Role;
} 