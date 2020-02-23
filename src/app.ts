import App from './server';
import DocumentsController from '../controllers/documents';
import CategoriesController from '../controllers/categories';
import AccountsController from '../controllers/accounts';
import UserController from '../controllers/users'
import logger from '../middleware/logger';
import * as bodyParser from 'body-parser';
import * as cors from 'cors'

const app = new App({
   port: 5000,
   middlewares: [
      logger,
      bodyParser.json(),
      bodyParser.urlencoded({ extended: true }),
      cors()
   ],
   controllers: [
      new DocumentsController(),
      new CategoriesController(),
      new AccountsController(),
      new UserController()
   ]
});

app.listen();