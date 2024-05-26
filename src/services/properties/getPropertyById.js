import NotFoundError from "../../Errors/NotFoundError.js";
import { PrismaClient } from "@prisma/client";

const getPropertyById = async (id) => {
  const prisma = new PrismaClient();
  const property = await prisma.property.findUnique({
    where: {
      id,
    },
    include: {
      Amenities: {
        select: { name: true },
      },
    },
  });

  if (!property) {
    throw new NotFoundError("property", id);
  }

  return property;
};

export default getPropertyById;
