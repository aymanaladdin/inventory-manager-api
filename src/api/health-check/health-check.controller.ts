import express, { Router } from "express";
import { IController } from "../../loader/interfaces";

export class HealthCheckController implements IController {
  private prefix: string;
  private routes: express.Router;

  constructor() {
    this.prefix = '/health-check';
    this.routes = Router();
    this.registerRoutes();
  }

  public getRoutes(): express.Router {
    return this.routes;
  }

  public getPrefix(): string {
    return this.prefix;
  }

  private registerRoutes() {
    this.routes.get('/', (req: express.Request, res: express.Response) => {
      res.status(200).json({});
    });
  }
}

