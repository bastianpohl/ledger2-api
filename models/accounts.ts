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
            LEFT JOIN accounts_users_relations as rel
            ON acc.id = rel.account
            WHERE
               rel.user = '${user}'
         `
         let [result, fields] = await dbm.query(sql)
         return result  
      } catch (error) {
         throw error
      }
   }

   getDetails = async (id: number) => {
      try {
         let sql = `
            SELECT 
            acc.id as id, 
            acc.title as title, 
            acc.iban as iban,
            bal.value as balance
            FROM
               accounts as acc
            LEFT JOIN 
               balances as bal
            ON 
               acc.iban = bal.iban
            WHERE
               acc.id = '${id}'
            AND
               bal.date = (SELECT MAX(valueDate) from transactions as trans WHERE trans.account = '${id}')
            `
         let [result, fields] = await dbm.query(sql)
         return result
      } catch (error) {
         throw error
      }
   }

   getOpeningBalance = async(account: number, from: string, to: string) => {
      try {
         let sql = `
         	SELECT 
                  openingBalance as opening
               FROM 
                  balances as bal
               LEFT JOIN  
                  accounts as acc
               ON 
                  acc.iban = bal.iban
               WHERE 
                  bal.date = (
                     SELECT 
                        MIN(valueDate) 
                     FROM 
                        transactions
                     WHERE 
                        valueDate 
                     BETWEEN '${from}' AND '${to}'
                     AND 
                        account = '${account}'
                  )
               AND 
                  acc.id = '${account}'
         `
         let [result, fields] = await dbm.query(sql)
         return result
      } catch (error) {
         throw error
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
         throw error
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
         let [result, fields] = await dbm.query(sql)
         return result   
      } catch (error) {
         throw error
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
         let [result, fields] = await dbm.query(sql)
         return result
      } catch (error) {
         throw error
      }
   }
}

export default Accounts