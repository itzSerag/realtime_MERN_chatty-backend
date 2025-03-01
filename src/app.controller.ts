import { Controller, Get, Res } from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';

@Controller()
export class AppController {
    // @Get('*') // Catch-all for non-API routes
    // serveFrontend(@Res() res: Response) {
    //     res.sendFile(join(__dirname, '..', '..', 'frontend', 'dist', 'index.html'), () => {
    //         if (__filename.endsWith('js')) {
    //             res.setHeader('Content-Type', 'application/javascript');
    //         }
    //     });
    // }
}
