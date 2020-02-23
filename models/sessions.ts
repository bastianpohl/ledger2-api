import DatabaseManager from './db';
import * as moment from 'moment';
import uuid from '../generic/uuid'

let dbm = new DatabaseManager({
   host: `localhost`,
   user: `chewie`,
   pass: `test`,
   db: `ledger`
})

class Sessions {
   constructor() {
      this.init()
   }

   private init = async () => {
      await dbm.checkDB()
   }

   getUserByToken = async (data) => {
      try {
         let now = moment().format("YYYY-MM-DD")
         let sql = `
            SELECT 
               user
            FROM
               sessions
            WHERE 
               token = '${data}' 
            AND
               token_valid_from <= '${now}' 
            AND
               token_valid_to >= '${now}'
            LIMIT 1
         `
         let [result, fields] = await dbm.query(sql)
         return result
      } catch (error) {
         throw error
      }
   }

   generateToken = async (user: Number) => {
      try {
         let sessionObj = {
            "token": uuid(),
            "user": user,
            "token_valid_from": moment().format("YYYY-MM-DD"),
            "token_valid_to": moment().add(5, "days").format("YYYY-MM-DD")
         }
   
         let sql = `
            INSERT INTO
               sessions
            SET
               ?
         `
         let [result, fields] = await dbm.query(sql, sessionObj)
         if (result.affectedRows === 1) {
            return sessionObj
         } else {
            throw new Error("could not create Session")
         }
      } catch (error) {
         throw error
      }
   }
}

export default Sessions