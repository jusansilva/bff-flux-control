import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'LAUCH-CONTROL',
            transport: Transport.TCP,
            options: { port: 3001 },
          },
        ]),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('create Launch', () => {
    it('should created launch', () => {
      const date = new Date();
      expect(
        appController.createLaunch({
          type: 'debit',
          description: 'Debit test',
          value: 100.0,
          date: date,
        }),
      ).toMatchObject({});
    });

    it('should created launch error negative value', () => {
      const errorMessages = '"value" must be larger than or equal to 0.01';
      try {
        appController.createLaunch({
          type: 'credit',
          description: 'Receive Door 4',
          value: -10,
          date: new Date(),
        });
      } catch (error) {
        expect(error.message).toBe(errorMessages);
      }
    });
  });

  describe('find Launch', () => {
    it('should find all launch', () => {
      expect(appController.getAllLaunch()).toMatchObject({});
    });
  });

  describe('find Launch', () => {
    it('should find launch by day', () => {
      expect(appController.getLaunchByDay()).toMatchObject({});
    });
  });
});
