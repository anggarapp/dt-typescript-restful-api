"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdressValidation = void 0;
const zod_1 = require("zod");
class AdressValidation {
}
exports.AdressValidation = AdressValidation;
AdressValidation.CREATE = zod_1.z.object({
    contact_id: zod_1.z.number().positive(),
    street: zod_1.z.string().min(1).max(255).optional(),
    city: zod_1.z.string().min(1).max(100).optional(),
    province: zod_1.z.string().min(1).max(100).optional(),
    country: zod_1.z.string().min(1).max(100),
    postal_code: zod_1.z.string().min(1).max(10),
});
AdressValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    contact_id: zod_1.z.number().positive(),
    street: zod_1.z.string().min(1).max(255).optional(),
    city: zod_1.z.string().min(1).max(100).optional(),
    province: zod_1.z.string().min(1).max(100).optional(),
    country: zod_1.z.string().min(1).max(100),
    postal_code: zod_1.z.string().min(1).max(10),
});
AdressValidation.GET = zod_1.z.object({
    contact_id: zod_1.z.number().positive(),
    id: zod_1.z.number().positive(),
});
AdressValidation.REMOVE = zod_1.z.object({
    contact_id: zod_1.z.number().positive(),
    id: zod_1.z.number().positive(),
});
