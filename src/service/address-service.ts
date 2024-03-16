import { Address, User } from "@prisma/client";
import { AddressResponse, CreateAdressRequest, GetAddressRequest, UpdateAdressRequest, toAddressResponse } from "../model/address-model";
import { Validation } from "../validation/validation";
import { AdressValidation } from "../validation/address-validation";
import { ContactService } from "./contact-service";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class AddressService {
    static async create(user: User, request: CreateAdressRequest): Promise<AddressResponse> {
        const createRequest = Validation.validate(AdressValidation.CREATE, request);
        await ContactService.checkContactmustExist(user.username, request.contact_id);
        const address = await prismaClient.address.create({
            data: createRequest
        });
        return toAddressResponse(address);

    }
    static async checkAddressMustExist(contact_id: number, id: number): Promise<Address> {
        const address = await prismaClient.address.findFirst({
            where: {
                id: id,
                contact_id: contact_id
            }
        })
        if (!address) {
            throw new ResponseError(404, "Address Not Found")
        }
        return address
    }
    static async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
        const getRequest = Validation.validate(AdressValidation.GET, request);
        await ContactService.checkContactmustExist(user.username, request.contact_id);
        const address = await this.checkAddressMustExist(getRequest.contact_id, getRequest.id);
        return toAddressResponse(address)
    }

    static async update(user: User, request: UpdateAdressRequest): Promise<AddressResponse> {
        const updateRequest = Validation.validate(AdressValidation.UPDATE, request);
        await ContactService.checkContactmustExist(user.username, request.contact_id);
        await this.checkAddressMustExist(request.contact_id, request.id);

        const address = await prismaClient.address.update({
            where: {
                id: updateRequest.id,
                contact_id: updateRequest.contact_id
            }, data: updateRequest
        });

        return toAddressResponse(address);
    }

    static async remove(user: User, request: GetAddressRequest): Promise<AddressResponse> {
        const removeRequest = Validation.validate(AdressValidation.REMOVE, request);
        await ContactService.checkContactmustExist(user.username, request.contact_id);
        await this.checkAddressMustExist(removeRequest.contact_id, removeRequest.id);

        const address = await prismaClient.address.delete({
            where: {
                id: removeRequest.id,
                contact_id: removeRequest.contact_id
            }
        })

        return toAddressResponse(address);
    }

    static async list(user: User, contactId: number): Promise<Array<AddressResponse>> {
        await ContactService.checkContactmustExist(user.username, contactId);

        const addresses = await prismaClient.address.findMany({
            where: {
                contact_id: contactId
            }
        });

        return addresses.map(address => toAddressResponse(address));
    }
}