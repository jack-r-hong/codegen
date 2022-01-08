
import {AuthService} from './authService';
import {UserModel} from './Models/userModel';
import {authErrors} from './authErrors';
import {User} from '@prisma/client';

const userModel = new UserModel();
const authService = new AuthService(userModel);

const user: User = {
  id: 1,
  createdAt: new Date('2022-01-07T08:16:03.860Z'),
  email: 'test@gmail.com',
  name: 'test',
  password: 'Xzas#rws1',
  authLevel: 1,
};

const findUserTest = () => {
  return describe('findUser', () => {
    userModel.findUser = jest.fn().mockImplementation((id) => {
      return new Promise((res, rej) => {
        if (id===1) {
          res(user);
        } else if (id===2) {
          res(null);
        } else {
          throw Error();
        }
      });
    });
    it('is right to return  value.', async () => {
      await expect(authService.findUser(1)).resolves.toEqual(user);
    });

    it('not find.', async () => {
      await expect(authService.findUser(2))
          .rejects.toThrow(new authErrors.NotFindError());
    });
  });
};

const createUserTest = () => {
  return describe('createUser', () => {
    const {email, password} =user;
    userModel.createUser = jest.fn().mockImplementation((
        [email, password]) => {
      return new Promise((res, rej) => {
        res(user);
      });
    });
    it('is right to return  value.', async () => {
      userModel.findUser = jest.fn().mockImplementation((email) => {
        return new Promise((res, rej) => {
          res(user);
        });
      });
      await expect(authService.createUser(
          [email, password, 'test'],
      )).resolves.toEqual(user);
    });

    it('is duplicate unique field.', async () => {
      userModel.findUser = jest.fn().mockImplementation((email) => {
        return new Promise((res, rej) => {
          throw Error();
        });
      });
      await expect(authService.createUser(
          [email+'false', password]),
      ).rejects.toThrow(new authErrors.DuplicateUniqueField());
    });
  });
};

const login = () => {
  return describe('login', () => {
    const {email, password} =user;

    it('is right to return  value.', async () => {
      userModel.findUser = jest.fn().mockImplementation((email) => {
        return new Promise((res, rej) => {
          res(user);
        });
      });
      await expect(authService.login(
          email, password,
      )).resolves.toEqual(user);
    });

    it('is duplicate unique field.', async () => {
      userModel.findUser = jest.fn().mockImplementation((email) => {
        return new Promise((res, rej) => {
          throw Error();
        });
      });
      await expect(authService.login(
          email+'false', password),
      ).rejects.toThrow(new authErrors.DuplicateUniqueField());
    });
  });
};


describe('Auth service unit test', () => {
  findUserTest();
  createUserTest();
  login();
});


