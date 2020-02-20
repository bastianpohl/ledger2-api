import { Router } from 'express'

interface IfController {   
   router: Router
   path: String
   
   initRoutes(): any
}

export default IfController