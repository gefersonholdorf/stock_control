import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { AuthModule } from "src/auth/auth.module";
import { Role } from "../enum/role.enum";
import { Roles } from "src/decorators/role.decorator";
import { RoleGuard } from "src/guards/role.guard";
import { FileModule } from "src/file/file.module";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), forwardRef(() => AuthModule), FileModule],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule{

}