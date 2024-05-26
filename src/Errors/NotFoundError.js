class NotFoundError extends Error {
  constructor(resourceType, id) {
    super(`${resourceType} with id ${id} was not found! Nope!`);
    this.name = "NotFoundError";
  }
}

export default NotFoundError;
