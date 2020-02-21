import App from './server';
import DocumentsController from '../controllers/documents';
import CategoriesController from '../controllers/categories';
import AccountsController from '../controllers/accounts'
import logger from '../middleware/logger';
import * as bodyParser from 'body-parser';

const app = new App({
   port: 5000,
   middlewares: [
      logger,
      bodyParser.json(),
      bodyParser.urlencoded({ extended: true })
   ],
   controllers: [
      new DocumentsController(),
      new CategoriesController(),
      new AccountsController()
   ]
});

app.listen();