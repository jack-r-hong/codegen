import {Service} from 'typedi';
import {PrismaClient, User} from '@prisma/client';

const prisma = new PrismaClient();

@Service()
export class UserModel {
  async create([email, password, name]: string[]) {
    const user: User = await prisma.user.create({
      data: {
        email,
        password,
        name,
        authLevel: 1,
      },
    }).catch((e) => {
      throw e;
    });

    prisma.$disconnect();
    return user;
  }

  async findUsers(findManyOption: any) {
    const {type, take, skip, cursorField, cursor: cursornum} = findManyOption;
    const cursor = type === 'cursor'? {
      [cursorField]: cursornum,
    }: undefined;

    const user: User[]|null = await prisma.user.findMany({
      take,
      skip,
      orderBy: {
        id: 'desc',
      },
      cursor,
    })
        .catch((e) => {
          throw e;
        });

    prisma.$disconnect();
    return user;
  }

  async findUser(whereParm: string|number ) {
    let whereField :string;
    switch (typeof whereParm) {
      case 'number':
        whereField = 'id';
        break;
      case 'string':
        whereField = 'email';
        break;
    }
    const user: User|null = await prisma.user.findUnique({
      where: {
        [whereField]: whereParm,
      },
    }).catch((e) => {
      throw e;
    });


    prisma.$disconnect();
    return user;
  }

  async update(
      id: number,
      password: string,
      name: string,
      authLevel?: number ) {
    const user:void| User = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
        name,
        // authLevel,
      },
    })
        .catch((e) => {
          throw e;
        });

    prisma.$disconnect();
    return user;
  }

  async delete(id: number) {
    const user: User = await prisma.user.delete({
      where: {
        id,
      },
    }).catch((e) => {
      throw e;
    });

    prisma.$disconnect();
    return user;
  }
}
