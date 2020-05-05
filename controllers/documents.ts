import { Request, Response, Router } from "express";
import IfController from '../interfaces/controller';
import Documents from '../models/documents'
import * as moment from 'moment'

class DocumentsController implements IfController {
   public router = Router()
   public path = "/documents"
   private docs: Documents

   constructor() {
      this.initRoutes()
      this.docs = new Documents()
   }

   public initRoutes() {
      // this.router.get(this.path, this.index)
      this.router.get(`${this.path}/:id`, this.read)
      this.router.get(`${this.path}/:id/:from/:to`, this.read)
      this.router.patch(this.path, this.asignCategory)
   }

   index = async (req: Request, res: Response) => {
      try {
         let result = await this.docs.getAll()
         res.status(200).json(result)
         this.docs.close()
      } catch (error) {
         res.status(400).json(error)
      }
   }

   read = async (req: Request, res: Response) => {
      try {
         const account = req.params.id
         const period = {
            from: req.params.from,
            to: req.params.to
         }
         const result = await this.docs.getFiltered(account, period)
         res.status(200).json(result)
      } catch (error) {
         res.status(400).json(error)
      }
   }

   asignCategory = async (req: Request, res: Response) => {
      try {
         let data = req.body
         let result = await this.docs.asignCategory(data)
         res.status(200).json(result)
      } catch (error) {
         res.status(400).json(error)
      }
   }
}

export default DocumentsController