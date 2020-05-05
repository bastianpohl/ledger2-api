import DatabaseManager from './db'

class Documents extends DatabaseManager{
   constructor() {
      super()
      this.init()
   }

   private init = async () => {
      await this.checkDB()
   }

   getAll = async () => {
      try {
         const sql =`
            SELECT
               *
            FROM
               transactions
         `
         const [result, fields] = await this.query(sql, undefined)
         return result
      } catch (error) {
         throw error
      }
   }

   getFiltered = async (account?, period?) => {
      try {
         let sql =`
            SELECT
               trans.id as id,
               trans.name as name,
               trans.type as type,
               trans.valueDate as date,
               trans.iban as iban,
               trans.amount as amount,
               trans.description as description,
               cat.title as category
            FROM
               transactions as trans
            LEFT JOIN
               categories as cat
            ON
               trans.category = cat.id
            WHERE
               trans.account = ?
            `
         const values = [account, period.from, period.to]
         
         if (period) {
            sql += `
               AND
                  trans.valueDate BETWEEN ? AND ?
               `
         }
         const [result, fields] = await this.query(sql, values)
         return result
      } catch (error) {
         throw error
      }
   }

   asignCategory = async(data) => {
      try {
         const sql = `
            UPDATE
               transactions
            SET category = ?
            WHERE id = ?
         `
         const values = [data.category, data.id]

         const [result, fields] = await this.query(sql, values)
         return result
      } catch (error) {
         throw error
      }
   }
}

export default Documents