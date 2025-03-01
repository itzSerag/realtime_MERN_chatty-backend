import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "src/core/database/database.schema";
import { Role } from "../enums/role.enum";

// userId --> the mongoId
@Schema({ timestamps: true })
export class UserDocument extends AbstractDocument {
    @Prop({ maxlength: 255, unique: true })
    email: string;

    @Prop({ minlength: 8 })
    password: string;

    @Prop({ maxlength: 11, minlength: 3, unique: true })
    username: string

    // Exactly 11 digits only for Egypt purposes
    @Prop({ minlength: 11, maxlength: 11, unique: true })
    phoneNumber: string;

    @Prop({ default: 'user', enum: Role, type: String })
    role?: Role

    @Prop({ default: "", type: String })
    imgUrl?: string
}




// this is the actual schema
export const UserSchema = SchemaFactory.createForClass(UserDocument);

UserSchema.pre("save", function (next) {
    this.username = this.username.trim();
    next();
});

