import { Role } from "src/modules/user/enums/role.enum"


export interface ITokenPayload {

    _id: string
    role: Role
} 