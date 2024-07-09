const RequestMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
} as const;

type RequestMethod = (typeof RequestMethod)[keyof typeof RequestMethod];

export { RequestMethod };
