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
         const sql  = `
         SELECT 
            *
         FROM
            categories
         `
         const [result, fields] = await this.query(sql, null)
         return result
      } catch (error) {
         throw error
      }
  }

  indexOfAccount = async (id) => {
   try {
      const sql = ` 
         SELECT 
            *
         FROM 
            categories
         WHERE 
            account = '${id}'
      `
      const values = [id]
      const [result, fields] = await this.query(sql, values)
      return result  
   } catch (error) {
      throw error
   }
  }

  get = async(data) => {
     try {
         const sql = `
            SELECT 
               *
            FROM
               categories
            WHERE
               id = ?
         `
         const [result, fields] = await this.query(sql, [data])
         return result    
     } catch (error) {
         throw error
     }
  }

  create = async (data) => {
      try {
         const sql = `
            INSERT INTO
               categories
            SET ?
         `
         const [result, fields] = await this.query(sql, data)
         return result  
      } catch (error) {
         throw error
      }
   }

   delete = async(data) => {
      try {
         const sql = `
            DELETE FROM
               categories
            WHERE id = ?
         `
         const [result, fields] = await this.query(sql, [data])
         return result 
      } catch (error) {
         throw error
      }
   }

   update = async(data) => {
      try {
         const sql = `
            UPDATE 
               categories
            SET
               title = ?
            WHERE
               id = ?
         `
         const [result, fields] = await this.query(sql, [data.title, data.id])
         return result 
      } catch (error) {
         throw error
      }
   }
}

export default Categories