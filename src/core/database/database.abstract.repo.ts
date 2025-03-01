import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { AbstractDocument } from "./database.schema";
import { Logger, NotFoundException } from "@nestjs/common";

export abstract class AbstractRepo<TDocument> extends AbstractDocument {
    protected abstract readonly logger: Logger;
    constructor(protected readonly model: Model<TDocument>) {
        super();
    }

    async create(document: Omit<TDocument, "_id">): Promise<TDocument> {
        const createdDocument = new this.model({
            ...document,
            _id: new Types.ObjectId(),
        });

        return (await createdDocument.save()).toJSON() as unknown as TDocument;
    }

    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model
            .findOne(filterQuery)
            .lean<TDocument>(true);


        if (!document) {
            this.logger.warn("Document is not found");
            throw new NotFoundException("Document is not found");
        }

        return document;
    }

    async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
        const document = await this.model
            .find(filterQuery)
            .lean<TDocument[]>(true)
            .select('-password');

        if (!document) {
            this.logger.warn("Document is not found");
            throw new NotFoundException("Document is not found");
        }

        return document;
    }

    async findOneAndUpdate(
        filterQuery: FilterQuery<TDocument>,
        update: UpdateQuery<TDocument>,
    ): Promise<TDocument> {
        const document = await this.model
            .findOneAndUpdate(filterQuery, update, {
                new: true,
            })
            .lean<TDocument>(true);

        if (!document) {
            this.logger.warn("Document is not found");
            throw new NotFoundException("Document is not found");
        }

        return document;
    }

    async findOneAndDelete(
        filterQuery: FilterQuery<TDocument>,
    ): Promise<TDocument> {
        return await this.model
            .findOneAndDelete(filterQuery)
            .lean<TDocument>(true);
    }

    async findAllExcept(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
        return await this.model.find({ _id: { $ne: filterQuery } })
            .select('-password')
            .lean<TDocument[]>(true)
    }
}
