import { PrismaClient } from "@prisma/client";

const getUserBookings = async (userId) => {
  const prisma = new PrismaClient();
  const userBookings = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      Bookings: true,
    },
  });

  return userBookings;
};

export default getUserBookings;
