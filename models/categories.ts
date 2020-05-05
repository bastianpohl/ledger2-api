import DatabaseManager from './db'

class Categories extends DatabaseManager{
   constructor() {
      super()
      this.init()
   }

   private init = async () => {
      await this.checkDB()
   }

   getAll = async () => {
      try {
         let sql  = `
         SELECT 
            *
         FROM
            categories
         `
         let [result, fields] = await this.query(sql)
         return result
      } catch (error) {
         throw error
      }
  }

  indexOfAccount = async (id) => {
   try {
      let sql = ` 
         SELECT 
            *
         FROM 
            categories
         WHERE 
            account = '${id}'
      `
      let [result, fields] = await this.query(sql)
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
         let [result, fields] = await this.query(sql, undefined)
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
         let [result, fields] = await this.query(sql, data)
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
         let [result, fields] = await this.query(sql, undefined)
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
         let [result, fields] = await this.query(sql, undefined)
         return result 
      } catch (error) {
         throw error
      }
   }
}

export default Categories