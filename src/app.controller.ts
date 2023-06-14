import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateLaunchRequest } from './dto/launch.dto';
import * as Joi from '@hapi/joi';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/launch')
  createLaunch(@Body() createLaunchRequest: CreateLaunchRequest) {
    const schema = Joi.object({
      type: Joi.string().valid('debit', 'credit').required(),
      description: Joi.string().required(),
      value: Joi.number().min(0.01).required(),
      date: Joi.date().required(),
    }).options({
      abortEarly: false,
    });

    const validated = schema.validate(createLaunchRequest);

    if (validated.error) {
      const errorMessages = validated.error.details
        .map((d) => d.message)
        .join();

      throw new BadRequestException(errorMessages);
    }
    return this.appService.createLaunch(createLaunchRequest);
  }

  @Get('/launch')
  getAllLaunch() {
    return this.appService.getAllLaunch();
  }

  @Get('/launch/day')
  getLaunchByDay() {
    return this.appService.getByDay();
  }
}
