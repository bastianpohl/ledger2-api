import DatabaseManager from './db'

let dbm = new DatabaseManager({
   host: `localhost`,
   user: `chewie`,
   pass: `test`,
   db: `ledger`
})

class Users {
   constructor(){
      this.init()
   }

   private init = async () => {
      await dbm.checkDB()
   }

   login = async (data: String) => {
      try {
         let sql = `
             SELECT
               id, user, pass_hash, pass_salt
            FROM 
               users 
            WHERE
               user = '${data}'
            LIMIT 1
         `
         let [result, fields] = await dbm.query(sql, undefined);
         return result[0]
      } catch (error) {
         throw error
      }
   }

   register = async(data) => {
      try {
         
      } catch (error) {
         throw error
      }
   }
}

export default Users