import { PrismaClient } from "@prisma/client";

const addAmenities = async (idArg, amenities) => {
  const prisma = new PrismaClient();

  for (let row in amenities) {
    console.log(`Added amenity :${amenities[row]}`);

    const updatedProperty = await prisma.property.update({
      where: {
        id: idArg,
      },
      data: {
        Amenities: {
          connect: {
            id: amenities[row],
          },
        },
      },
    });
  }
};
export default addAmenities;
