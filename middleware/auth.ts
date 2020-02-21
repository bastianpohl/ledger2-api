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

   private exceptionURLs = [
      "/login", "/register"
   ]

   public user: Number
   
   constructor(req: Request, res: Response, next: NextFunction) {
      this.checkAuthentication(req, res, next)
      this.user = Number()
   }

   checkAuthentication = async(req: Request, res: Response, next) => {  
      try {
         if (!this.exceptionURLs) {
            let token = req.headers['x-token']
            this.tokenExists(token)
            await this.validateToken(token)
         }
         next()
      } catch (error) {
         res.status(401).json(error)
      }
   }

   private tokenExists = (token) => {
      if (!token) {
         throw new Error(this.messages.token_not_set)
      }
   }

   private validateToken = async(token) => {
      let user = await this.getUser(token)
      switch (user.length) {
         case 0:
            throw new Error(this.messages.token_invalid);
         case 1:
            console.log(`${this.messages.access_granted} ${user[0].user}`);
            break;
         default:
            throw new Error(this.messages.error);
      }
   }

   private getUser = async(token) => {
      try {
         let sessions = await new Sessions()
         return await sessions.getUserByToken(token)
      } catch (error) {
         throw error
      }
   }

   private checkException = (req: Request) => {
      return this.exceptionURLs.includes(req.baseUrl)
   }
}

export default Auth