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
         throw error
      }
   }

   asignCategory = async(data) => {
      try {
         let sql = `
            UPDATE 
               transactions
            SET category = ${data.category}
            WHERE id = ${data.id}
         `
         let [result, fields] = await dmb.query(sql)
         return result
      } catch (error) {
         throw error
      }
   }
}

export default Documents