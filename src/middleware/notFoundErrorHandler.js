const notFoundErrorHandler = (err, req, res, next) => {
  if (err.name === "NotFoundError") {
    //throw new Error(
    return res
      .status(404)
      .json({ message: "Stuff is wrong! Double check inputs & stuff" });
  }

  next(err);
};

export default notFoundErrorHandler;
