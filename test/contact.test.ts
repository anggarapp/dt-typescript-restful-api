import supertest from "supertest";
import { ContactTest, UserTest } from "./test-util"
import { logger } from "../src/application/logging";
import { web } from "../src/application/web";

describe('POST /api/contacts', () => {
    beforeEach(async () => {
        await UserTest.create();
    });
    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should create new contact', async () => {
        const response = await supertest(web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "test",
                last_name: "test",
                email: "test@example.com",
                phone: "000000"
            })
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe("test");
        expect(response.body.data.last_name).toBe("test");
        expect(response.body.data.email).toBe("test@example.com");
        expect(response.body.data.phone).toBe("000000");
    })

    it('should reject create new contact if data invalid', async () => {
        const response = await supertest(web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "",
                last_name: "",
                email: "example.com",
                phone: "00000000000000000000000000000000000000"
            })
        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })
})