import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/role.decorator";
import { Role } from "src/enum/role.enum";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private readonly reflector : Reflector) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const { user } = context.switchToHttp().getRequest()

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getClass(),
            context.getHandler()
        ])

        if (!requiredRoles) {
            return true
        }

        return requiredRoles.some((role) => user.role?.includes(role))
    }

}