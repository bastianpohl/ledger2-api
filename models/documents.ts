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
               trans.account = '${account}'
            `
         if (period) {
            sql += `
               AND
                  trans.valueDate BETWEEN '${period.from}' AND '${period.to}'
               `
         }
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