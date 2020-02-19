import { Router } from 'express'

interface IfController {
   initRoutes(): any
   router: Router
}

export default IfController