import { PrismaClient } from "@prisma/client";

const getUsers = async (usernameArg, emailArg) => {
  const prisma = new PrismaClient();
  if (usernameArg === undefined && emailArg === undefined) {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
      },
    });

    return users;
  } else {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: usernameArg,
            email: emailArg,
          },
        ],
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
      },
    });

    return users;
  }
};

export default getUsers;
