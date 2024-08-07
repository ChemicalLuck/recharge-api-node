import type { Response } from "node-fetch";

class HTTPResponseError extends Error {
  response: Response;

  constructor(response: Response) {
    super(`HTTP Error Response: ${response.status} ${response.statusText}`);
    this.response = response;
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
