import supertest from "supertest";
import { AddressTest, ContactTest, UserTest } from "./test-util";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe('POST /api/contact/:contactId/adresses', () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create()
    });

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be able to create address", async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "Nokron",
                city: "Mistwood",
                province: "Limgrave",
                country: "Land Between",
                postal_code: "666666"
            });
        logger.debug(response);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe("Nokron");
        expect(response.body.data.city).toBe("Mistwood");
        expect(response.body.data.province).toBe("Limgrave");
        expect(response.body.data.country).toBe("Land Between");
        expect(response.body.data.postal_code).toBe("666666");
    });

    it("should reject create address if request invalid", async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "Nokron",
                city: "Mistwood",
                province: "Limgrave",
                country: "",
                postal_code: ""
            });
        logger.debug(response);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
    it("should reject create address if contact not found", async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .post(`/api/contacts/${contact.id + 1}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "Nokron",
                city: "Mistwood",
                province: "Limgrave",
                country: "Land Between",
                postal_code: "666666"
            });
        logger.debug(response);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

})

describe("GET /api/contacts/:contactId/addresses/:addressId", () => {

    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create()
        await AddressTest.create()
    });

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be able to get address", async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(address.id);
        expect(response.body.data.street).toBe(address.street);
        expect(response.body.data.city).toBe(address.city);
        expect(response.body.data.province).toBe(address.province);
        expect(response.body.data.country).toBe(address.country);
        expect(response.body.data.postal_code).toBe(address.postal_code);

    })
    it("should reject get address if contact not found", async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web)
            .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();

    })
    it("should reject get address if address not found", async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();

    })

});

describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create()
        await AddressTest.create()
    });

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be able to update address", async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "Nokron",
                city: "Mistwood",
                province: "Limgrave",
                country: "Land Between",
                postal_code: "666666"
            });
        logger.debug(response);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe("Nokron");
        expect(response.body.data.city).toBe("Mistwood");
        expect(response.body.data.province).toBe("Limgrave");
        expect(response.body.data.country).toBe("Land Between");
        expect(response.body.data.postal_code).toBe("666666");
    });

    it("should reject to update address if request invalid", async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "Nokron",
                city: "Mistwood",
                province: "Limgrave",
                country: "",
                postal_code: ""
            });
        logger.debug(response);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("should reject to update address if address not found", async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "Nokron",
                city: "Mistwood",
                province: "Limgrave",
                country: "Land Between",
                postal_code: "666666"
            });
        logger.debug(response);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

    it("should reject to update address if contact not found", async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "Nokron",
                city: "Mistwood",
                province: "Limgrave",
                country: "Land Between",
                postal_code: "666666"
            });
        logger.debug(response);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});

describe('DELETE /api/contacts/:contactId/addresses/:addressId', () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create()
        await AddressTest.create()
    });

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be able to delete address", async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("OK");
    })
    it("should reject to delete address if contact not found", async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })
    it("should reject to delete address if address not found", async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })
})
describe('GET /api/contacts/:contactId/addresses', () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create()
        await AddressTest.create()
    });

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be able to get addresses list", async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
        logger.debug(response);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
    })
    it("should reject to get addresses list if contact not found", async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id + 1}/addresses`)
            .set("X-API-TOKEN", "test")
        logger.debug(response);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })
})