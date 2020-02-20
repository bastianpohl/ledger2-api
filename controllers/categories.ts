import { Request, Response, Router } from "express";
import IfController from '../interfaces/controller';
import Categories from '../models/categories';

class CategoryController implements IfController {
   public router = Router()   
   public path = '/categories'
   private categories: Categories

   constructor() {
      this.initRoutes()
      this.categories = new Categories()
   }
   
   public initRoutes() {
      this.router.get(this.path, this.index);
      this.router.get(`${this.path}/:id`, this.get);
      this.router.post(this.path, this.create);
      this.router.patch(this.path, this.update);
      this.router.delete(this.path, this.delete);
   }

   index = async (req: Request, res: Response) => {
      let result = await this.categories.getAll()
      res.status(200).json(result)
   }

   get = async (req: Request, res: Response) => {
      let id = req.params.id
      let result = await this.categories.get(id)
      res.status(200).json(result)
   }

   create = async (req: Request, res: Response) => {
      let data = req.body
      let result = await this.categories.create(data)
      res.status(201).json(result)
   }

   update = async (req: Request, res: Response) => {
      let data = req.body
      let result = await this.categories.update(data)
      res.status(202).json(result)
   }

   delete = async (req: Request, res: Response) => {
      let id = req.body.id
      let result = await this.categories.delete(id)
      res.status(202).json(result)
   }
 
}

export default CategoryController