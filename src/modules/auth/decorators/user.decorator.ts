import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserDocument } from "src/modules/user/model/user.schema";


export const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {

    // pull the user off from the request 
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return context.switchToHttp().getRequest().user
}

export const CurrentUser = createParamDecorator(

    // some nerds call it ctx ,, keep it simple man !
    (_data: unknown, context: ExecutionContext) => getCurrentUserByContext(context)
)