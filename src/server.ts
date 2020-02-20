import * as express from 'express'
import { Application } from 'express'

class App {
   public app: Application
   public port: Number
   constructor(init: { port: number; middlewares: any; controllers: any;}) {
      this.app = express()
      this.port = init.port
      this.middlewares(init.middlewares)
      this.routes(init.controllers)
   }

   private middlewares(middlewares) {
      middlewares.forEach(middleware => {
         this.app.use(middleware)
      });
   }
   
   private routes(controllers) {
      controllers.forEach(controller => {
         this.app.use(controller.router)
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