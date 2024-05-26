import NotFoundError from "../../Errors/NotFoundError.js";
import { PrismaClient } from "@prisma/client";

const getAmenityById = async (id) => {
  const prisma = new PrismaClient();
  const amenity = await prisma.amenity.findUnique({
    where: {
      id,
    },
  });

  if (!amenity) {
    throw new NotFoundError("amenity", id);
  }

  return amenity;
};

export default getAmenityById;
