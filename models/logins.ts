import DatabaseManager from './db'

let dbm = new DatabaseManager({
   host: `localhost`,
   user: `chewie`,
   pass: `test`,
   db: `ledger`
})

class Logins {
   constructor() {
      this.init()
   }

   private init = async () => {
      await dbm.checkDB()
   }

   index = async () => {
      try {
         const sql = `
            SELECT
               *
            FROM
               fints_credentials
         `
         const [results, fields] = await dbm.query(sql, undefined)
         return results
      } catch (error) {
         throw error
      }
   }

   create = async (data) => {
      try {
         const sql = `
            INSERT INTO
               fints_credentials
            SET
               ?
         `
         const [results, fields] = await dbm.query(sql, data)
         return results
      } catch (error) {
         throw error
      }
   }
}

export default Logins