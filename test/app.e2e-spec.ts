import { ValidationPipe, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pacturm from 'pactum';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    await pacturm.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = { email: 'mihon3@gmail.com', password: '1234' };

    describe('Signup', () => {
      it('should throw if email is empty', () => {
        return pacturm
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('should throw if password is empty', () => {
        return pacturm
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
        // .inspect() could use it to inspect response body
      });

      it('should throw if body is empty', () => {
        return pacturm.spec().post('/auth/signup').expectStatus(400);
      });

      it('should signup', () => {
        return pacturm.spec().post('/auth/signup').withBody(dto).expectStatus(201);
      });
    });
    describe('Signin', () => {
      it('should throw if email is empty', () => {
        return pacturm
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('should throw if password is empty', () => {
        return pacturm
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
        // .inspect() could use it to inspect response body
      });

      it('should throw if body is empty', () => {
        return pacturm.spec().post('/auth/signin').expectStatus(400);
      });

      it('should signin', () => {
        return pacturm.spec().post('/auth/signin').withBody(dto).expectStatus(200);
      });
    });
  });
  describe('User', () => {
    describe('Get me', () => {});
    describe('Edit user', () => {});
  });
  describe('Bookmarks', () => {
    describe('Get empty bookmarks', () => {
      it('Should return empty bookmarks', () => {
        return pacturm
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .inspect();
      });
    });
    describe('Create bookmark', () => {});
    describe('Get bookmarks', () => {});
    describe('Get bookmark by id', () => {});
    describe('Get bookmark by id', () => {});
    describe('Delete bookmark by id', () => {});
  });
});
