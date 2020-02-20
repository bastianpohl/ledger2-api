import { Request, Response, Router } from "express";
import IfController from '../interfaces/controller';
import Documents from '../models/documents'

class DocumentsController implements IfController {
   public path = "/documents"
   public router = Router()
   private docs: Documents

   constructor() {
      this.initRoutes()
      this.docs = new Documents()
   }

   public initRoutes() {
      this.router.get(this.path, this.index)
      this.router.patch(this.path, this.asignCategory)
   }

   index = async (req: Request, res: Response) => {
      let result = await this.docs.getAll()
      res.status(200).json(result)
   }

   asignCategory = async (req: Request, res: Response) => {
      let data = req.body
      let result = this.docs.asignCategory(data)
      res.status(200).json(result)
   }
}

export default DocumentsController