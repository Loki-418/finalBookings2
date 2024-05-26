import { PrismaClient } from "@prisma/client";

const getProperties = async (loc, ppn, amen) => {
  const prisma = new PrismaClient();
  const ppnf = parseFloat(ppn);
  //console.log(amen);
  if (loc === undefined && ppn === undefined && amen === undefined) {
    return prisma.property.findMany({
      include: {
        Amenities: {
          select: { name: true },
        },
      },
    });
  } else {
    return prisma.property.findMany({
      where: {
        location: loc,
        pricePerNight: ppnf,
        Amenities: { some: { name: { contains: amen } } },
      },
    });
  }
};

export default getProperties;
