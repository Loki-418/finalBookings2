import { PrismaClient } from "@prisma/client";

const getHosts = async (Name) => {
  const prisma = new PrismaClient();
  if (Name === undefined) {
    return prisma.host.findMany();
  } else {
    return prisma.host.findMany({
      where: { name: Name },
    });
  }
};

export default getHosts;
