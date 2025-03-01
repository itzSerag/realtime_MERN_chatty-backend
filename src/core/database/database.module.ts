import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ModelDefinition, MongooseModule } from "@nestjs/mongoose";

// this means mongo depends on config service telling heyyy first configure this module then come to me

@Module({
    imports: [
        MongooseModule.forRootAsync({
            // tells nestjs how to create this module options
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get("MONGO_URI"),
            }),
            // this tells us the dependencies we need to run this (runs before it)
            inject: [ConfigService],
        }),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule {
    // Dynamically register models
    // without importing directly the MongooseModule for each module
    static forFeature(model: ModelDefinition[]) {
        return MongooseModule.forFeature(model);
    }
}
