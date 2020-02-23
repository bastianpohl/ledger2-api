import DatabaseManager from './db'

let dbm = new DatabaseManager({
   host: `localhost`,
   user: `chewie`,
   pass: `test`,
   db: `ledger`
})

class Categories {
   constructor() {
      this.init()
   }

   private init = async () => {
      await dbm.checkDB()
   }

   getAll = async () => {
      try {
         let sql  = `
         SELECT 
            *
         FROM
            categories
         `
         let [result, fields] = await dbm.query(sql)
         return result         
      } catch (error) {
         throw error
      }
  }

  get = async(data) => {
     try {
         let sql = `
            SELECT 
               *
            FROM
               categories
            WHERE
               id = ${data}
         `
         let [result, fields] = await dbm.query(sql, undefined)
         return result    
     } catch (error) {
         throw error
     }
  }

  create = async (data) => {
      try {
         let sql = `
            INSERT INTO
               categories
            SET ?
         `
         let [result, fields] = await dbm.query(sql, data)
         return result  
      } catch (error) {
         throw error
      }
   }

   delete = async(data) => {
      try {
         let sql = `
            DELETE FROM
               categories
            WHERE id = ${data}
         `
         let [result, fields] = await dbm.query(sql, undefined)
         return result 
      } catch (error) {
         throw error
      }
   }

   update = async(data) => {
      try {
         let sql = `
            UPDATE 
               categories
            SET
               title = '${data.title}'
            WHERE
               id = '${data.id}'
         `
         let [result, fields] = await dbm.query(sql, undefined)
         return result 
      } catch (error) {
         throw error
      }
   }
}

export default Categories