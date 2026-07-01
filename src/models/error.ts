import type { Response } from "node-fetch";

class HTTPResponseError extends Error {
  response: Response;
  status: number;
  body: unknown;

  constructor(response: Response, body?: unknown) {
    super(`HTTP Error Response: ${response.status} ${response.statusText}`);
    this.name = "HTTPResponseError";
    this.response = response;
    this.status = response.status;
    this.body = body;
  }
}

class RechargeAPIError extends Error {
  constructor(message: string) {
    super(`Recharge API Error: ${message}`);
  }
}

class NotImplementedError extends Error {
  constructor(message: string) {
    super(`Not Implemented: ${message}`);
  }
}

export { HTTPResponseError, RechargeAPIError, NotImplementedError };
