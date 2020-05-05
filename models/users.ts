import DatabaseManager from './db'

class Users extends DatabaseManager {
   constructor(){
      super()
      this.init()
   }

   private init = async () => {
      await this.checkDB()
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
         let [result, fields] = await this.query(sql, undefined);
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

   index = async () => {
      try {
         let sql = `
            SELECT
               id, user
            FROM
               users
         `
         let [result, fields] = await this.query(sql, undefined)
         return result
      } catch (error) {
         throw error
      }
   }

   create = async (data) => {
      try {
         const sql = `
            INSERT INTO
               users
            SET ?
         `
         let [result, fields] = await this.query(sql, data)
         return result
      } catch (error) {
         throw error
      }
   }

   delete = async (id) => {
      try {
         const sql = `
            DELETE FROM
               users
            WHERE
               id = ${id}
         `
         let [result, fields] = await this.query(sql, undefined)
         return result
      } catch (error) {
         throw error
      }
   }
}

export default Users