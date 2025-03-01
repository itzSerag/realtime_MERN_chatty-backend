import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Error as MongooseError } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'An unexpected error occurred';

        // Handle known NestJS HTTP exceptions
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const responsePayload = exception.getResponse();

            if (typeof responsePayload === 'string') {
                message = responsePayload;
            } else if (typeof responsePayload === 'object' && responsePayload !== null && 'message' in responsePayload) {
                message = (responsePayload as { message: string }).message || message;
            }
        }

        // Handle Mongoose and MongoDB errors
        else if (exception instanceof MongoServerError && exception.code === 11000) {
            status = HttpStatus.CONFLICT;

            // Extract the conflicting field name from the error object
            const conflictingField = Object.keys(exception.keyPattern)[0]; // Get the first key in the keyPattern
            message = `This '${conflictingField}' already exists.`;
        } else if (exception instanceof MongooseError.ValidationError) {
            status = HttpStatus.BAD_REQUEST;
            message = exception.message;
        } else if (exception instanceof MongooseError.CastError) {
            status = HttpStatus.BAD_REQUEST;
            message = 'Invalid ID format';
        }

        // Handle unknown errors
        else {
            const error = exception as Error;
            this.logger.warn(`Unexpected error: ${error.message}`, error.stack);
        }

        // Log the error
        this.logger.warn(`Error: ${message}`, (exception as Error).stack);

        // Send the response
        response.status(status).json({
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
        });
    }
}