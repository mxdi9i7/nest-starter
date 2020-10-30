import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectTwilio, TwilioClient } from "nestjs-twilio";

@Injectable()
export class TwilioService {
  constructor(
    @InjectTwilio() private readonly client: TwilioClient,
    private configService: ConfigService,
  ) {}

  async createSid(): Promise<string> {
    const serviceID = await this.client.verify.services.create({
      friendlyName: this.configService.get<string>("TWILIO_NAME"),
    });

    const { sid } = serviceID;
    return sid;
  }

  async sendVerificationMessage(receiverNumber: string): Promise<any> {
    try {
      const phoneNumber = "+1" + receiverNumber;
      const sid = await this.createSid();
      const createVerificationProps = {
        to: phoneNumber,
        channel: "sms",
      };
      const result = await this.client.verify
        .services(sid)
        .verifications.create(createVerificationProps);
      if (result.status === "pending") {
        return sid;
      } else {
        return {
          success: false,
        };
      }
    } catch (error) {
      return error;
    }
  }

  async verifyCode({ code, receiverNumber, sid }): Promise<any> {
    try {
      const phoneNumber = "+1" + receiverNumber;
      const verificationCheckProps = {
        to: phoneNumber,
        code,
      };
      const result = await this.client.verify
        .services(sid)
        .verificationChecks.create(verificationCheckProps);
      return {
        success: true,
        data: result.status,
      };
    } catch (error) {
      return error;
    }
  }
}
