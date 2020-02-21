import { Request, Response, NextFunction } from "express";
import Sessions from '../models/sessions'

class Auth {
   private messages = {
      "token_invalid": "token is invalid",
      "token_not_set": "no token set",
      "access_denied": "access denied",
      "error": "not declared error",
      "access_granted": "User with ID:"
      }

   private token: String
   public user: Number
   
   constructor(req: Request, res: Response, next: NextFunction) {
      this.checkAuthentication(req, res, next)
      this.user = Number()
   }

   checkAuthentication = async(req: Request, res: Response, next) => {  
      try {
         let token = req.headers['x-token']
         this.tokenExists(token)
         let user = await this.getUser(token)
         switch (user.length) {
            case 0:
               res.status(401).json(this.messages.token_invalid)
               break;
            case 1:
               console.log(`${this.messages.access_granted} ${user[0].user}`);
               next();
         }
      } catch (error) {
         res.status(400).json(error)
      }
   }

   private tokenExists = (token) => {
      if (!token) {
         throw new Error(this.messages.token_not_set)
      }
   }

   private getUser = async(token) => {
      try {
         let sessions = await new Sessions()
         return await sessions.getUserByToken(token)
      } catch (error) {
         return error
      }
   }


}




export default Auth