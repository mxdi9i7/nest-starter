import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { TwilioService } from "./twilio.service";

@Controller("twilio")
export class TwilioController {
  constructor(private twilioService: TwilioService) {}

  @Post("verify")
  async verification(@Request() req) {
    return this.twilioService.sendVerificationMessage(req.body.phone);
  }

  @Post("checkCode")
  async checkCode(@Request() req) {
    return this.twilioService.verifyCode({
      code: req.body.code,
      receiverNumber: req.body.phone,
      sid: req.body.sid,
    });
  }
}
