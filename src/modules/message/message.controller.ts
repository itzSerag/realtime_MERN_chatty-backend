import { Body, Controller, Get, Param, Post, UseGuards, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';
import { CurrentUser } from 'src/modules/auth/decorators/user.decorator';
import { UserDocument } from 'src/modules/user/model/user.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { Types } from 'mongoose';
import { log } from 'console';

@Controller({ path: "message", version: "1" })
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  findAllUserForSidebar(@CurrentUser() user: UserDocument) {
    return this.messageService.findAllUserForSidebar(String(user._id));
  }

  @UseGuards(JwtAuthGuard)
  @Get('messages/:id')
  getMessagesHistory(
    @CurrentUser() user: UserDocument,
    @Param('id') _id: string,
  ) {
    return this.messageService.getMessagesHistory(
      String(user._id), 
      String(_id),

    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('send/:id')
  async sendMessage(
    @CurrentUser() user: UserDocument,
    @Param('id') receiverId: string,
    @Body() body: CreateMessageDto,
  ) {
    const senderId = user._id;
    const receiverObjectId = new Types.ObjectId(receiverId);
    return await this.messageService.sendMessage(body.imageBase64, body.text, senderId, receiverObjectId);
  }
}