import supertest from "supertest";
import { web } from "../src/application/web"
import { logger } from "../src/application/logging";
import { UserTest } from "./test-util";
import bcrypt from "bcrypt";


describe('POST /api/users', () => {
    afterEach(async () => {
        await UserTest.delete();
    });
    it('should reject register new user if request invalid', async () => {
        const response = await supertest(web)
            .post("/api/users")
            .send({
                username: "",
                password: "",
                name: "",
            });
        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should register new user', async () => {
        const response = await supertest(web)
            .post("/api/users")
            .send({
                username: "test",
                password: "test",
                name: "test",
            });
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
    });
});

describe('POST /api/users/login', () => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });

    it("should be able to login", async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "test"
            });
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
        expect(response.body.data.token).toBeDefined();
    });

    it("should be reject login if username wrong", async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "tost",
                password: "test"
            });
        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });

    it("should be reject login if password wrong", async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "tost"
            });
        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});

describe("GET /api/users/current", () => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });

    it("should be able to get user", async () => {
        const response = await supertest(web)
            .get("/api/users/current")
            .set("X-API-TOKEN", "test");
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("test");
        expect(response.body.data.username).toBe("test");
    });

    it("should reject get user if token is invalid", async () => {
        const response = await supertest(web)
            .get("/api/users/current")
            .set("X-API-TOKEN", "toss");
        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});

describe('PATCH /api/users/current', () => {

    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });

    it("should reject update user if request invalid", async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                password: "",
                name: ""
            });
        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("should reject update user if wrong token", async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "salah")
            .send({
                password: "benar",
                name: "benar"
            });
        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
    it("should update user name", async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                name: "benar"
            });
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("benar");
    });
    it("should update user password", async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                password: "benar",
            });
        logger.debug(response.body);
        expect(response.status).toBe(200);
        const user = await UserTest.get();
        expect(await bcrypt.compare("benar", user.password)).toBe(true);
    });
});