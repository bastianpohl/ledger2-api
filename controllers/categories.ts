import { Request, Response, Router } from "express";
import IfController from '../interfaces/controller';
import Categories from '../models/categories';

class CategoryController implements IfController {
   public router = Router();
   public path = '/categories';
   private categories: Categories;

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
      try {
         let result = await this.categories.getAll()
         res.status(200).json(result)
      } catch (error) {
         res.status(400).json(error)
      }
   }

   get = async (req: Request, res: Response) => {
      try {
         let id = req.params.id
         let result = await this.categories.get(id)
         res.status(200).json(result)       
      } catch (error) {
         res.status(400).json(error)
      }
   }

   create = async (req: Request, res: Response) => {
      try {
         let data = req.body
         let result = await this.categories.create(data)
         res.status(201).json(result)         
      } catch (error) {
         res.status(400).json(error)
      }
   }

   update = async (req: Request, res: Response) => {
      try {
         let data = req.body
         let result = await this.categories.update(data)
         res.status(202).json(result)         
      } catch (error) {
         res.status(400).json(error)
      }
   }

   delete = async (req: Request, res: Response) => {
      try {
         let id = req.body.id
         let result = await this.categories.delete(id)
         res.status(202).json(result)
      } catch (error) {
         res.status(400).json(error)
      }
   }
 
}

export default CategoryController