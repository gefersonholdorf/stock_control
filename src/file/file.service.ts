import { Injectable } from "@nestjs/common";
import { writeFileSync } from "fs";

@Injectable()
export class FileService {

    async upload(file : Express.Multer.File, path : string){
        return await writeFileSync(path, file.buffer)
    }
}