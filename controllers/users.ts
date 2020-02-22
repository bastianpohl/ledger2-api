import IfController from "../interfaces/controller";
import { Request, Response, Router } from "express";
import Sessions from '../models/sessions';
import Users from "../models/users";
import * as hasha from 'hasha';

class UserController implements IfController {
   public router = Router();
   public path = "/user";
   private users: Users;
   
   constructor() {
      this.initRoutes()
      this.users = new Users()
   }
   
   initRoutes() {
      this.router.post('/login', this.login)
      this.router.post('/register', this.register)
   }

   login = async (req: Request, res: Response) => {
      try {
         let user = req.body.user
         let pass = req.body.pass
         let result = await this.users.login(user)
         
         if (result === undefined) {
            res.status(401).json("Login unbekannt")
         }

         if (!await this.validatePassword(pass, result.pass_hash, result.pass_salt)) {
            res.status(401).json('Password falsch')
         }
         
         let sessions = await new Sessions()
         let sessionObj = await sessions.generateToken(result.id)
         res.status(201).json(sessionObj)
         
      } catch (error) {
         res.status(400).json(error)
      }
   }

   register = async (req: Request, res: Response) => {
      try {
         
      } catch (error) {
         res.status(400).json(error)
      }
   }

   private validatePassword = async (pass, hash, salt) => {
      let hashed_pass = await hasha.async(pass+salt, {algorithm: "sha256"})
      return (hashed_pass === hash) ? true: false
   }
}

export default UserController