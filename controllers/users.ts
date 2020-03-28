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
      this.router.post(`/validate`, this.validate)
   }

   login = async (req: Request, res: Response) : Promise<any> => {
      try {
         let user = req.body.user
         let pass = req.body.pass
         let result = await this.users.login(user)
         
         if (result === undefined) {
            res.status(401).json("Login unbekannt")
            return
         }

         if (!await this.validatePassword(pass, result.pass_hash, result.pass_salt)) {
            res.status(401).json('Password falsch')
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

   private validatePassword = async (pass, hash, salt) : Promise<Boolean> => {
      let hashed_pass = await hasha.async(pass+salt, {algorithm: "sha256"})
      return (hashed_pass === hash) ? true : false
   }
}

export default UserController