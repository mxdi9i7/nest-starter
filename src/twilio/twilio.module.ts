import { TwilioModule as TModule } from "nestjs-twilio";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TwilioController } from "./twilio.controller";
import { TwilioService } from "./twilio.service";

@Module({
  imports: [
    ConfigModule,
    TModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        accountSid: configService.get<string>("TWILIO_ACCOUNT_SID"),
        authToken: configService.get<string>("TWILIO_AUTH_TOKEN"),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [TwilioController],
  providers: [TwilioService],
  exports: [TwilioService],
})
export class TwilioModule {}
