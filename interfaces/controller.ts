import { Router } from 'express'

interface IfController {   
   router: Router
   initRoutes(): any
   
}

export default IfController