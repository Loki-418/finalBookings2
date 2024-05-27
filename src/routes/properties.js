import express from "express";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authorize from "../middleware/Authorize.js";
import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import createProperty from "../services/properties/createProperty.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import addAmenities from "../services/properties/addAmenities.js";

const router = express.Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const { location, pricePerNight, amenities } = req.query;
      const property = await getProperties(location, pricePerNight, amenities);
      res.status(200).json(property);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const property = await getPropertyById(id);

      res.status(200).json(property);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authorize, async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;
    const newProperty = await createProperty(
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating
    );
    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  authorize,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        hostId,
        rating,
      } = req.body;
      const updatedProperty = await updatePropertyById(
        id,
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        hostId,
        rating
      );
      res.status(200).json(updatedProperty);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);
router.put(
  "/:id/addAmenities",
  authorize,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { ...deze } = req.body;

      const allez = [];
      for (let val in deze) {
        if (val) allez[val] = deze[val];
      }

      const addedAmenity = await addAmenities(id, allez);
      res.status(200).json(addedAmenity);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  authorize,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedPropertyById = await deletePropertyById(id);

      res.status(200).json({
        message: `User with id ${deletedPropertyById} was deleted!`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
