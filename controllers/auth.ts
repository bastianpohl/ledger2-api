import IfController from "../interfaces/controller";
import { Router } from "express";

class Auth implements IfController{
   public router: Router
   constructor(){
      this.initRoutes()
   }

   initRoutes() {
   }   


}