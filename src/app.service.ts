import { Inject, Injectable } from '@nestjs/common';
import { CreateLaunchRequest } from './dto/launch.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CreateLaunchEvent } from './events/create.lauch.event';

@Injectable()
export class AppService {
  constructor(
    @Inject('LAUCH-CONTROL') private readonly lauchControlService: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  createLaunch(CreateLaunchRequest: CreateLaunchRequest) {
    return this.lauchControlService.send(
      {
        cmd: 'create_launch',
      },
      new CreateLaunchEvent(
        CreateLaunchRequest.type,
        CreateLaunchRequest.description,
        CreateLaunchRequest.value,
        CreateLaunchRequest.date,
      ),
    );
  }

  getAllLaunch() {
    return this.lauchControlService.send({ cmd: 'find_all_launch' }, {});
  }

  getByDay() {
    return this.lauchControlService.send({ cmd: 'find_launch_by_today' }, {});
  }
}
