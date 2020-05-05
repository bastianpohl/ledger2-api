import DatabaseManager from './db';
import * as moment from 'moment';
import uuid from '../generic/uuid'

class Sessions extends DatabaseManager{
   constructor() {
      super();
      this.init()
   }

   private init = async () => {
      await this.checkDB()
   }

   getUserByToken = async (data) => {
      try {
         const now = moment().format("YYYY-MM-DD")
         const sql = `
            SELECT 
               user, token_valid_from, token_valid_to
            FROM
               sessions
            WHERE 
               token = ? 
            AND
               token_valid_from <= ?
            AND
               token_valid_to >= ?
            LIMIT 1
         `
         const values = [data, now, now]
         const [result, fields] = await this.query(sql, values)
         return result
      } catch (error) {
         throw error
      }
   }

   generateToken = async (user: Number) => {
      try {
         const sessionObj = {
            "token": uuid(),
            "user": user,
            "token_valid_from": moment().format("YYYY-MM-DD"),
            "token_valid_to": moment().add(5, "days").format("YYYY-MM-DD")
         }
   
         const sql = `
            INSERT INTO
               sessions
            SET
               ?
         `
         const [result, fields] = await this.query(sql, sessionObj)
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