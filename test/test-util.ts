import { User } from "@prisma/client";
import { primsaClient } from "../src/application/database";
import bcrypt from "bcrypt";

export class UserTest {
    static async delete() {
        await primsaClient.user.deleteMany({
            where: {
                username: "test"
            }
        });
    }

    static async create() {
        await primsaClient.user.create({
            data: {
                username: "test",
                name: "test",
                password: await bcrypt.hash("test", 10),
                token: "test"
            }
        })
    }

    static async get(): Promise<User> {
        const user = await primsaClient.user.findFirst({
            where: {
                username: "test"
            }
        })
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
}