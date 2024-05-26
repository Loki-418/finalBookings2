const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(400).json({ message: "Something went wrong again!" });
};

export default errorHandler;
