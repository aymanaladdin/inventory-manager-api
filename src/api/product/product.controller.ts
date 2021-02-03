import express, { Router } from "express";
import { IController, IValidator } from "../../loader/interfaces";
import { IsAuthorizedMiddleWare } from "../auth/middleware";
import { ProductService } from "./product.service";
export class ProductController implements IController {
  private prefix: string;
  private routes: express.Router;

  constructor(
    private productService: ProductService,
    private productValidator: IValidator,
    private isAuthorizedMiddleWare: IsAuthorizedMiddleWare,
  ) {
    this.prefix = '/products';
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
    this.routes.get('/', this.isAuthorizedMiddleWare.verify, this.productValidator.listProducts, async (req: express.Request, res: express.Response) => {
      const products = await this.productService.listProducts({});

      res.json(products);
    });

    this.routes.post('/', this.isAuthorizedMiddleWare.verify, this.productValidator.createProduct, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const { sub } = (<any>req).decodedToken;
      const productInfo = req.body;

      try {
        const product = await this.productService.createNewProduct({ creator: sub, ...productInfo });

        res.json(product);
      }
      catch (err) {
        console.log(err);

        next(err);
      }
    });

    this.routes.get('/:key', this.isAuthorizedMiddleWare.verify, this.productValidator.getProduct, async (req: express.Request, res: express.Response) => {
      const { key } = req.params;
      const product = await this.productService.getProduct(key, {});

      if (!product) res.status(404).json({ error: { message: `Product ${key} not found!` } });

      else res.json(product);
    });
  }
}