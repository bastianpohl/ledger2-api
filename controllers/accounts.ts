import IfController from '../interfaces/controller';
import { Request, Response, Router } from 'express';
import Sessions from '../models/sessions';
import Accounts from '../models/accounts'

class AccountsController implements IfController {
   public router = Router();
   public path = "/accounts";
   private token: String;
   private accounts: Accounts;

   constructor() {
      this.initRoutes()
      this.accounts = new Accounts()
   }

   initRoutes() {
      this.router.get(this.path, this.index)
      this.router.get(`${this.path}/details/:id`, this.getDetails)
      this.router.get(`${this.path}/balance/:id/:from/:to`, this.getOpeningBalance)
      this.router.post(this.path, this.create)
      this.router.patch(this.path, this.update)
      this.router.delete(this.path, this.delete)
   }

   index = async (req: Request, res: Response) => {
      try {
         let user = await this.getUser(String(req.headers['x-token']))
         let result = await this.accounts.index(user)
         res.status(200).json(result)
      } catch (error) {
         res.status(400).json(error)
      }
   }

   getDetails = async (req: Request, res: Response) => {
      try {
         const account = Number(req.params.id)
         const result = await this.accounts.getDetails(account)
         res.status(200).json(result)
      } catch (err) {
         res.status(400).json(err)
      }
   }

   getOpeningBalance = async (req: Request, res: Response) => {
      try {
         const account = Number(req.params.id)
         const from = req.params.from
         const  to = req.params.to
         const result = await this.accounts.getOpeningBalance(account, from, to)
         res.status(200).json(result)
      } catch (err) {
         res.status(400).json(err)
      }
   }

   create = async (req: Request, res: Response) => {
      try {
         const data = req.body
         const result = await this.accounts.create(data)
         const user = await this.getUser(String(req.headers['x-token']))
         await this.accounts.asignUser(user, result.insertId)
         res.status(200).json(result)
      } catch (error) {
         res.status(400).json(error)
      }
   }

   update = async (req: Request, res: Response) => {
      try {
         let data = req.body
         let result = await this.accounts.update(data)
         res.status(200).json(result)
      } catch (error) {
         res.status(400).json(error)
      }
   }

   delete = async (req: Request, res: Response) => {
      try {
         let id = req.body.id
         let result = await this.accounts.delete(id)
         res.status(200).json(result)
      } catch (error) {
         res.status(400).json(error)
      }
   }

   private getUser = async (token) => {
      let session = await new Sessions()
      let result = await session.getUserByToken(token)
      return result[0].user
   }
}

export default AccountsController