import { Request, Response, Router } from "express";
import IfController from '../interfaces/controller';
import Logins from '../models/logins'
import * as Cryptr from 'cryptr'

class LoginsController implements IfController {
   public router = Router()
   public path = '/logins'
   private logins: Logins

   constructor() {
      this.initRoutes()
      this.logins = new Logins()
   }

   initRoutes() {
      this.router.get(this.path, this.index)
      this.router.post(this.path, this.create)
   }

   index = async (req: Request, res: Response) => {
      try {
         const result = await this.logins.index()
         res.status(200).json(result)
      } catch (error) {
         res.status(400).json(error)
      }
   }

   create = async (req: Request, res: Response) => {
      try {
         const secret = process.env.SECRET
         const cryptr = new Cryptr(secret)
         const data = req.body
         data.login = cryptr.encrypt(data.login)
         data.pin = cryptr.encrypt(data.pin)
         const result = await this.logins.create(data)
         res.status(200).json(result)
      } catch (error) {
         res.status(400).json(error)
      }
   }


}

export default LoginsController