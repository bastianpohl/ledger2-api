import DatabaseManager from './db'

let dmb = new DatabaseManager({
   host: `localhost`,
   user: `chewie`,
   pass: `test`,
   db: `ledger`
})

class Documents {
   constructor() {
      this.init()
   }

   private init = async () => {
      await dmb.checkDB()
   }
   
   getAll = async () => {
      try {
         let sql =`
            SELECT 
               *
            FROM 
               transactions
         `
         let [result, fields] = await dmb.query(sql, undefined)
         return result
      } catch (error) {
         return error
      }
   }
}

export default Documents