import { Router } from 'express'
import { Request, Response } from "express";
import IfController from '../interfaces/controller';
import Documents from '../models/documents'

class DocumentsController implements IfController {
   public path = "/"
   public router = Router()

   constructor() {
      this.initRoutes()
   }

   public initRoutes() {
      this.router.get(this.path, this.index)
   }

   index = async (req: Request, res: Response) => {
      let docs = await new Documents()
      let result = await docs.getAll()
      res.json(result)
   }
}

export default DocumentsController