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
         let now = moment().format("YYYY-MM-DD")
         let sql = `
            SELECT 
               user, token_valid_from, token_valid_to
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
         let [result, fields] = await this.query(sql)
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
         let [result, fields] = await this.query(sql, sessionObj)
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