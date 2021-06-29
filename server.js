const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./models/index');
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
const { connectSockets } = require('./services/socket.service');
const dotenv = require('dotenv');
const emailer = require('./services/email.service');
dotenv.config();
// routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware');

const logger = require('./services/logger.service');

const app = express();
const http = require('http').createServer(app);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// const session = expressSession({
//   secret: 'coding is amazing',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false },
// });
// Express App Config
app.use(express.json());
// app.use(session);

// const corsOptions = {
//   origin: ['*'],
//   credentials: true,
// };
const allowlist = ['https://icy-island-02f153f10.azurestaticapps.net','*']
const corsOptionsDelegate = function (req, callback) {
  const corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
console.log('corsOptionsDelegate:', corsOptionsDelegate)
// app.use(cors());

app.all('*', setupAsyncLocalStorage);

connectSockets(http, session);

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
// app.get('/**', (req, res) => {
//   console.log('__dirname:', __dirname__);
//   res.sendFile(path.join(__dirname__, 'public', 'index.html'));
// })

console.log('process.env.PORT:', process.env.PORT);
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

  http.listen(port, () => {
    logger.info('Server is running on port: ' + port);
    // emailer.sendMail('testSub', { titleProduct: 'SERVER UP ! ', price: new Date() });
  });
});
