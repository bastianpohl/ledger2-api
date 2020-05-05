import DatabaseManager from './db'

class Logins extends DatabaseManager {
   constructor() {
      super()
      this.init()
   }

   private init = async () => {
      await this.checkDB()
   }

   index = async () => {
      try {
         const sql = `
            SELECT
               *
            FROM
               fints_credentials
         `
         const [results, fields] = await this.query(sql, undefined)
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
         const [results, fields] = await this.query(sql, data)
         return results
      } catch (error) {
         throw error
      }
   }
}

export default Logins