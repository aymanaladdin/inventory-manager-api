import { asClass, asFunction, asValue, createContainer, Resolver } from 'awilix';
import { AuthController } from '../api/auth/auth.controller';
import { AuthRepository } from '../api/auth/auth.repository';
import { AuthService } from '../api/auth/auth.service';
import { IsAuthorizedMiddleWare } from '../api/auth/middleware';
import { authValidator } from '../api/auth/validatiors';
import { HealthCheckController } from '../api/health-check/health-check.controller';
import { ProductController } from '../api/product/product.controller';
import { ProductRepository } from '../api/product/product.repository';
import { ProductService } from '../api/product/product.service';
import { productValidator } from '../api/product/validatior';
import { knexClient } from '../extensions';

function asArray(resolvers) {
  return {
    resolve: (container, opts) => resolvers.map(r => container.build(r, opts))
  }
}

export const dependencyContainer = createContainer({ injectionMode: 'CLASSIC' })
  .register({
    controllerList: <any>asArray([
      asClass(HealthCheckController, { lifetime: 'SINGLETON' }),
      asClass(ProductController, { lifetime: 'SINGLETON' }),
      asClass(AuthController, { lifetime: 'SINGLETON' }),
    ]),
    productService: asClass(ProductService, { lifetime: 'SINGLETON' }),
    productRepository: asClass(ProductRepository, { lifetime: 'SINGLETON' }),
    knexClient: asValue(knexClient),
    productValidator: asValue(productValidator),
    authService: asClass(AuthService, { lifetime: 'SINGLETON' }),
    authRepository: asClass(AuthRepository, { lifetime: 'SINGLETON' }),
    authValidator: asValue(authValidator),
    isAuthorizedMiddleWare: asClass(IsAuthorizedMiddleWare, { lifetime: 'SINGLETON' })
  });
