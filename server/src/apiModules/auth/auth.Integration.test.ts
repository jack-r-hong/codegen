import * as http from 'http';
import request from 'supertest';
import {UserModel} from './Models/userModel';
import {ExpressApp} from '../../expressApp';

const userModel = new UserModel();

const app = http.createServer(new ExpressApp().app);

const mainPath = '/auth';

const subPath = 'user';
const input = {
  email: 'test@gmail.com',
  password: 'Xzas#rwsa1',
  name: 'test',
  authLevel: 1,
};
const {email, password, name} = input;
const sendBody = {
  email,
  password,
  name,
};

const postUserTest = () => {
  return describe('post', ()=>{
    test(`${mainPath}/${subPath} 201`, async () => {
      const response = await request(app)
          .post(`${mainPath}/${subPath}`)
          .send(sendBody);
      await userModel.delete(response.body.id);
      expect(response.statusCode).toBe(201);
      (Object.keys(input) as Array<keyof typeof input>)
          .forEach((key) => {
            expect(response.body[key]).toBe(input[key]);
          });
    });

    test(`${mainPath}/${subPath} 409`, async () => {
      const user = await userModel.createUser([email, password, name]);
      const response = await request(app)
          .post(`${mainPath}/${subPath}`)
          .send(sendBody);

      await userModel.delete(user.id);

      expect(response.statusCode).toBe(409);
    });
  });
};

const getUsersTest = () => {
  return describe('Get', () => {
    test(`Get ${mainPath}/${subPath} 200`, async () => {
      const user = await userModel.createUser([email, password, name]);
      const response = await request(app)
          .get(`${mainPath}/${subPath}`)
          .query({
            skip: 0,
            take: 10,
            sort: 'id',
            sequ: 'asc',
          });
      await userModel.delete(user.id);
      expect(response.statusCode).toBe(200);
    });

    test(`Get ${mainPath}/${subPath}/:id 200`, async () => {
      const user = await userModel.createUser([email, password, name]);
      const response = await request(app)
          .get(`${mainPath}/${subPath}/${user.id}`);
      await userModel.delete(user.id);
      expect(response.statusCode).toBe(200);
    });
  });
};

const getUserTest = () => {
  return describe('Get', () => {
    test(`Get ${mainPath}/${subPath}/:id 200`, async () => {
      const user = await userModel.createUser([email, password, name]);
      const response = await request(app)
          .get(`${mainPath}/${subPath}/${user.id}`);
      await userModel.delete(user.id);
      expect(response.statusCode).toBe(200);
    });
  });
};


describe('user', ()=>{
  postUserTest();
  getUsersTest();
  getUserTest();

  test(`Put ${mainPath}/${subPath}/:id 200`, async () => {
    const user = await userModel.createUser([email, password, name]);
    const response = await request(app)
        .put(`${mainPath}/${subPath}/${user.id}`)
        .send({
          password: 'Xzas#rwsa1',
          name: 'testUpdated',
        });
    await userModel.delete(user.id);
    expect(response.statusCode).toBe(200);
  });

  test(`Delete ${mainPath}/${subPath}/:id 204`, async () => {
    const user = await userModel.createUser([email, password, name]);
    const response = await request(app)
        .del(`${mainPath}/${subPath}/${user.id}`);

    if (response.statusCode !== 204) {
      await userModel.delete(user.id);
    }

    expect(response.statusCode).toBe(204);
  });
});


