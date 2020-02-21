import DatabaseManager from './db'

let dbm = new DatabaseManager({
   host: `localhost`,
   user: `chewie`,
   pass: `test`,
   db: `ledger`
})

class Accounts {
   constructor() {
      this.init()
   }

   private init = async () => {
      await dbm.checkDB()
   }

   index = async(user) => {
      try {
         let sql = `
            SELECT 
               acc.id, acc.iban, acc.title
            FROM
               accounts as acc
            LEFT JOIN accounts_user_relations as rel
            ON acc.id = rel.account
            WHERE
               rel.user = '${user}'
         `
         let [result, fields] = await dbm.query(sql, undefined)
         return result  
      } catch (error) {
         return error
      }
   }

   create = async (data) => {
      try {
         let sql = `
            INSERT INTO
               accounts
            SET ?
         `
         let [result, fields] = await dbm.query(sql, data)
         return result          
      } catch (error) {
         return error
      }
   }

   update = async (data) => {
      try {
         let sql = `
            UPDATE 
               accounts
            SET
               iban = '${data.iban}' AND
               title = '${data.title}
            WHERE
               id = '${data.id}'
         `
         let [result, fields] = await dbm.query(sql, undefined)
         return result   
      } catch (error) {
         return error
      }
   }

   delete = async (data) => {
      try {
         let sql = `
            DELETE FROM
               accounts
            WHERE
               id = '${data}'
         `
         let [result, fields] = await dbm.query(sql, undefined)
         return result          
      } catch (error) {
         return error
      }
   }
}

export default Accounts