import express from "express";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import getUserById from "../services/users/getUserById.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";
import authorize from "../middleware/Authorize.js";
import getUserBookings from "../services/users/getUserBookings.js";

const router = express.Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const { username, email } = req.query;
      //console.log(username, email);
      const user = await getUsers(username, email);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authorize, async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;
    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.put(
  "/:id",
  authorize,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { username, password, name, email, phoneNumber, profilePicture } =
        req.body;
      const updatedUser = await updateUserById(
        id,
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture
      );
      res.status(200).json(updatedUser);
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
      const deletedUserById = await deleteUserById(id);

      res.status(200).json({
        message: `User with id ${deletedUserById} was deleted!`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.get("/:id/bookings", async (req, res, next) => {
  try {
    const { id } = req.params;
    const userBookings = await getUserBookings(id);

    res.status(200).json(userBookings);
  } catch (error) {
    next(error);
  }
});

export default router;
