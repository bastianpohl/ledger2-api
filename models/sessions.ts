import DatabaseManager from './db';
import * as moment from 'moment';

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
         let [result, fields] = await dbm.query(sql, undefined)
         return result
      } catch (error) {
         return error
      }
   }
}

export default Sessions