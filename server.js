const express = require('express');
const cors = require('cors');
let db;
let dbGannayEyalon;
if (process.env.NODE_ENV === 'production') {
  console.log('innnnnn proddddd');
  db = require('./models/index');
  dbGannayEyalon = require('./models-gannay-eylon/index');
} else {
  console.log('innnnnn devvvvvv');
  db = require('./models/local-index');
  dbGannayEyalon = require('./models-gannay-eylon/local-index');
}

const expressSession = require('express-session');
const CategoryService = require('./api/category/category.service');
const CategoryController = require('./api/category/category.controller');
const CategoryRoute = require('./api/category/category.routes');
const ProductService = require('./api/product/product.service');
const ProductController = require('./api/product/product.controller');
const ProductRoute = require('./api/product/product.routes');
const PriceService = require('./api/price/price.service');
const PriceController = require('./api/price/price.controller');
const PriceRoute = require('./api/price/price.routes');
const OrderService = require('./api/order/order.service');
const OrderController = require('./api/order/order.controller');
const OrderRoute = require('./api/order/order.routes');
const SizePriceService = require('./api/sizePrice/sizePrice.service');
const SizePriceController = require('./api/sizePrice/sizePrice.controller');
const SizePriceRoute = require('./api/sizePrice/sizePrice.routes');
const CartService = require('./api/cart/cart.service');
const CartController = require('./api/cart/cart.controller');
const CartRoute = require('./api/cart/cart.routes');
const IsMenuEnableService = require('./api/isMenuEnable/isMenuEnable.service.js');
const IsMenuEnableController = require('./api/isMenuEnable/isMenuEnable.controller.js');
const IsMenuEnabletRoute = require('./api/isMenuEnable/isMenuEnable.routes.js');
const AuthService = require('./api/auth/auth.service');
const AuthController = require('./api/auth/auth.controller');
const AuthRoute = require('./api/auth/auth.routes');
const ProductGnService = require('./api/gannay-eylon-api/product/product.service');
const ProductGnController = require('./api/gannay-eylon-api/product/product.controller');
const ProductGnRoute = require('./api/gannay-eylon-api/product/product.routes');
const dotenv = require('dotenv');
dotenv.config();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware');
const logger = require('./services/logger.service');
const CategoryGnService = require('./api/gannay-eylon-api/category/category.service');
const CategoryGnController = require('./api/gannay-eylon-api/category/category.controller');
const CategoryGnRoute = require('./api/gannay-eylon-api/category/category.routes');
const EventDeatilsService = require('./api/gannay-eylon-api/eventDetails/eventDetails.service');
const EventDeatilsController = require('./api/gannay-eylon-api/eventDetails/eventDetails.controller');
const EventDeatilsRoute = require('./api/gannay-eylon-api/eventDetails/eventDetails.routes');
const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');

app.use(
  cors({
    allowedHeaders: ['sessionId', 'Content-Type'],
    exposedHeaders: ['sessionId'],
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  })
);

const session = expressSession({
  secret: process.env.SecretPasswordSession,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});

app.use(session);
app.use(express.json());
app.all('*', setupAsyncLocalStorage);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3030;

db.sequelize.sync().then(() => {
  const categoryService = new CategoryService();
  const categoryController = new CategoryController(categoryService);
  new CategoryRoute(app, categoryController);

  const productService = new ProductService();
  const productController = new ProductController(productService);
  new ProductRoute(app, productController);

  const priceService = new PriceService();
  const priceController = new PriceController(priceService);
  new PriceRoute(app, priceController);

  const sizePriceService = new SizePriceService();
  const sizePriceController = new SizePriceController(sizePriceService);
  new SizePriceRoute(app, sizePriceController);

  const cartService = new CartService();
  const cartController = new CartController(cartService);
  new CartRoute(app, cartController);

  const orderService = new OrderService();
  const orderController = new OrderController(orderService);
  new OrderRoute(app, orderController);

  const isMenuEnableService = new IsMenuEnableService();
  const isMenuEnableController = new IsMenuEnableController(
    isMenuEnableService
  );
  new IsMenuEnabletRoute(app, isMenuEnableController);

  const authService = new AuthService();
  const authController = new AuthController(authService, bcryptjs, jwt, logger);
  new AuthRoute(app, authController);

  dbGannayEyalon.sequelize
    .sync()
    .then(() => {
      const productGnService = new ProductGnService();
      const productGnController = new ProductGnController(productGnService);
      new ProductGnRoute(app, productGnController);

      const categoryGnService = new CategoryGnService();
      const categoryGnController = new CategoryGnController(categoryGnService);
      new CategoryGnRoute(app, categoryGnController);

      const eventDeatilsService = new EventDeatilsService();
      const eventDeatilsController = new EventDeatilsController(
        eventDeatilsService,
        categoryGnService
      );
      new EventDeatilsRoute(app, eventDeatilsController);
      http.listen(port, () => {
        logger.info('Server is running on port: ' + port);
      });
    })
    .catch((err) => console.log('errrrr:', err));
});
