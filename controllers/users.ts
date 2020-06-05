import IfController from "../interfaces/controller";
import { Request, Response, Router } from "express";
import Sessions from '../models/sessions';
import Users from "../models/users";
import * as hasha from 'hasha';

class UserController implements IfController {
   public router = Router();
   public path = "/users";
   private users: Users;

   constructor() {
      this.initRoutes()
      this.users = new Users()
   }

   initRoutes() {
      this.router.post('/login', this.login)
      this.router.post('/register', this.register)
      this.router.post(`/validate`, this.validate)
      this.router.post(this.path, this.create)
      this.router.get(this.path, this.index)
      this.router.delete(`${this.path}/:id`, this.delete)
   }

   login = async (req: Request, res: Response) : Promise<any> => {
      try {
         let user = req.body.user
         let pass = req.body.pass
         let result = await this.users.login(user)

         if (result === undefined) {
            res.status(401).json({"msg": "ä"})
            return
         }

         if (!await this.validatePassword(pass, result.pass_hash, result.pass_salt)) {
            res.status(401).json({"msg": "ö"})
            return
         }

         let sessions = await new Sessions()
         let sessionObj = await sessions.generateToken(result.id)
         res.status(201).json(sessionObj)

      } catch (error) {
         res.status(400).json(error)
      }
   }

   register = async (req: Request, res: Response) : Promise<any> => {
      try {

      } catch (error) {
         res.status(400).json(error)
      }
   }

   validate = async (req: Request, res: Response) : Promise<any> => {
      try {
         let token = req.body.token
         let session = await new Sessions()
         let result = await session.getUserByToken(token)
         switch (result.length) {
            case 1:
               res.status(200).json({
                  user: result[0].user,
                  token: token,
                  token_valid_from: result[0].token_valid_from,
                  token_valid_to: result[0].token_valid_to
               })
               break;
            case 0:
               res.status(400).json(null)
            default:
               throw "DB ERROR"
               break;
         }
      } catch (err) {
         res.status(401).send()
      }
   }

   index = async (req: Request, res: Response): Promise<any> => {
      try {
         const result = await this.users.index()
         res.status(200).json(result)
      } catch (error) {
         res.status(400).send()
      }
   }

   create = async (req: Request, res: Response): Promise<any> => {
      try {
         const salt = this.generateSalt()
         const newUser = {
            user: req.body.user,
            pass_hash: await this.hashPassword(req.body.pass, salt),
            pass_salt: salt
         }
         const result = await this.users.create(newUser)
         res.status(200).json(result)
      } catch (error) {
         res.status(400).send()
      }
   }

   delete = async (req: Request, res: Response): Promise<any> => {
      try {
         const id = req.params.id
         const result = await this.users.delete(id)
         res.status(200).json(result)
      } catch (error) {
         res.status(400).send()
      }
   }


   private validatePassword = async (pass: String, hash: String, salt: String): Promise<Boolean> => {
      let hashed_pass = await hasha.async(`${pass}${salt}`, {algorithm: "sha256"})
      return (hashed_pass === hash) ? true : false
   }

   private hashPassword = async (pass: String, salt: String): Promise<String> => {
      return await hasha.async(`${pass}${salt}`, { algorithm: "sha256" })
   }

   private generateSalt(): String {
      return (Math.random() * 1e32).toString(36)
   }

}

export default UserController