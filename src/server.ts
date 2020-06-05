import * as express from 'express'
import { Application, Request, Response } from 'express'
import Auth from '../middleware/auth'
import * as cors from 'cors';

class App {
   public app: Application
   public port: Number

   constructor(init: { port: number; middlewares: any; controllers: any;}) {
      this.app = express()
      this.port = init.port
      this.cors()
      this.auth()
      this.middlewares(init.middlewares)
      this.routes(init.controllers)
   }
   
   private auth() {
      this.app.use('*', (req: Request, res: Response, next) => {
         new Auth(req, res, next)
      })
   }

   private cors() {
      this.app.use(cors())
   }

   private middlewares(middlewares) {
      middlewares.forEach(middleware => {
         this.app.use(middleware)
      });
   }
   
   private routes(controllers) {
      controllers.forEach(controller => {
         this.app.use(process.env.BASE_PATH, controller.router)
      });
   }

   public listen() {
      this.app.listen(this.port, () => {
         console.log(
            `Server listening on Port: ${this.port}`
         );
      })
   }
}

export default App