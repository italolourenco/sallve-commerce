import { Request } from "express";

export interface IController {
  handle(request: Request);
}
