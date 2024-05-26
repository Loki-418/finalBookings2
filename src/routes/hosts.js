import express from "express";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authorize from "../middleware/Authorize.js";
import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import createHost from "../services/hosts/createHost.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";

const router = express.Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const { name } = req.query;
      const host = await getHosts(name);
      res.status(200).json(host);
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
      const host = await getHostById(id);

      res.status(200).json(host);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authorize, async (req, res, next) => {
  try {
    const {
      userId,
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const newHost = await createHost(
      userId,
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(201).json(newHost);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  authorize,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        userId,
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      } = req.body;
      const updatedHost = await updateHostById(
        id,
        userId,
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe
      );
      res.status(200).json(updatedHost);
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
      const deletedHostById = await deleteHostById(id);

      res.status(200).json({
        message: `Host with id ${deletedHostById} was deleted!`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
