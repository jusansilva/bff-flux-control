import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/launch (GET)', () => {
    return request(app.getHttpServer()).get('/launch').expect(200);
  });

  it('/launch/day (GET)', () => {
    return request(app.getHttpServer()).get('/launch/day').expect(200);
  });

  it('/launch (POST)', () => {
    return request(app.getHttpServer())
      .post('/launch')
      .send({
        type: 'credit',
        description: 'Receive Door 4',
        value: 10,
        date: new Date(),
      })
      .expect(201);
  });
});
