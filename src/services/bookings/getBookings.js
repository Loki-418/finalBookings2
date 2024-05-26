import { PrismaClient } from "@prisma/client";

const getBookings = async (uId) => {
  const prisma = new PrismaClient();
  if (uId) {
    return prisma.booking.findMany({
      where: { userId: uId },
    });
  } else {
    return prisma.booking.findMany();
  }
};

export default getBookings;
