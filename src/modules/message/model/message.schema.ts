import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { AbstractDocument } from "../../../core/database/database.schema";

@Schema({ timestamps: true })
export class MessageDocument extends AbstractDocument {

    @Prop({ type: SchemaTypes.ObjectId, ref: 'UserDocument', required: true })
    senderId: Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'UserDocument', required: true })
    receiverId: Types.ObjectId;

    @Prop({ type: String, required: true, maxlength: 500 })
    text: string

    // using the url -- is there any image in the message ?
    @Prop({ type: String, required: false, maxlength: 255 })
    image?: string

}

export const MessageSchema = SchemaFactory.createForClass(MessageDocument);