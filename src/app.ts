import App from './server'
import DocumentsController from '../controllers/documents'
import logger from '../middleware/logger'
import * as bodyParser from 'body-parser'

const app = new App({
   port: 5000,
   middlewares: [
      logger,
      bodyParser.json()
   ],
   controllers: [
       new DocumentsController()
   ]
})

app.listen()