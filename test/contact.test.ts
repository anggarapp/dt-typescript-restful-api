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

describe("GET /api/contacts/:contactId", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create()
    });
    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should be able get contact', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test");
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.first_name).toBe(contact.first_name)
        expect(response.body.data.last_name).toBe(contact.last_name)
        expect(response.body.data.email).toBe(contact.email)
        expect(response.body.data.phone).toBe(contact.phone)
    })
    it('should reject get contact if contact is not found', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id + 1}`)
            .set("X-API-TOKEN", "test");
        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined()

    })
});

describe("PUT /api/contacts/:contactId", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create()
    });
    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be able to update contact", async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "maxwell",
                last_name: "ashborn",
                email: "ashborn@maxwell.com",
                phone: "000000000000000000"
            })
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(contact.id)
        expect(response.body.data.first_name).toBe("maxwell")
        expect(response.body.data.last_name).toBe("ashborn")
        expect(response.body.data.email).toBe("ashborn@maxwell.com")
        expect(response.body.data.phone).toBe("000000000000000000")
    })
    it("should reject update contact if request invalid", async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "",
                last_name: "ashborn",
                email: "maxwell.com",
                phone: "00000000000000000000000000000"
            })
        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});

describe('Delete /api/contacts/:contactId', () => {

    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create()
    });
    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be able to remove contact", async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("OK");
    });
    it("should reject remove contact if contact not found", async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id + 1}`)
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});

describe("GET /api/contacts", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create()
    });
    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be able search contact without param", async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .set("X-API-TOKEN", "test");
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    })
    it("should be able search contact using name", async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .query({
                name: "es"
            })
            .set("X-API-TOKEN", "test");
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    })
    it("should be able search contact using email", async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .query({
                email: ".com"
            })
            .set("X-API-TOKEN", "test");
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    })
    it("should be able search contact using phone", async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .query({
                phone: "000"
            })
            .set("X-API-TOKEN", "test");
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    })

    it("should be able search contact using not found name", async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .query({
                name: "err"
            })
            .set("X-API-TOKEN", "test");
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(0);
        expect(response.body.paging.size).toBe(10);
    })

    it("should be able search contact with paging", async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .query({
                page: 2,
                size: 1,
            })
            .set("X-API-TOKEN", "test");
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
        expect(response.body.paging.current_page).toBe(2);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(1);
    })
})