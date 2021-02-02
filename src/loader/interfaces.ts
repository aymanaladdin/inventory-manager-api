import express from "express";

export interface IController {
  getPrefix(): string;
  getRoutes(): express.Router;
}

export interface IValidator {
  [key: string]: (req: express.Request, res: express.Response, next: express.NextFunction) => void
}