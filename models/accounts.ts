import DatabaseManager from './db'

class Accounts extends DatabaseManager{
   constructor() {
      super()
      this.init()
   }

   private init = async () => {
      await this.checkDB()
   }

   index = async(user: number) => {
      try {
         const sql = `
            SELECT 
               acc.id, acc.iban, acc.title
            FROM
               accounts as acc
            LEFT JOIN accounts_users_relations as rel
            ON acc.id = rel.account
            WHERE
               rel.user = ?
         `
         const values = [user]
         const [result, fields] = await this.query(sql, values)
         return result  
      } catch (error) {
         throw error
      }
   }

   getDetails = async (id: number) => {
      try {
         const sql = `
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
               acc.id = ?
            AND
               bal.date = (SELECT MAX(valueDate) from transactions as trans WHERE trans.account = ?)
            `
         const values = [id, id]
         const [result, fields] = await this.query(sql, values)
         return result
      } catch (error) {
         throw error
      }
   }

   getOpeningBalance = async(account: number, from: string, to: string) => {
      try {
         const sql = `
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
                     BETWEEN ? AND ?
                     AND 
                        account = ?
                  )
               AND 
                  acc.id = ?
         `
         const [result, fields] = await this.query(sql, [from, to, account, account])
         return result
      } catch (error) {
         throw error
      }
   }



   create = async (data) => {
      try {
         const sql = `
            INSERT INTO
               accounts
            SET ?
         `
         const [result, fields] = await this.query(sql, data)
         return result
      } catch (error) {
         throw error
      }
   }

   update = async (data) => {
      try {
         const sql = `
            UPDATE 
               accounts
            SET
               iban = ? AND
               title = ?
            WHERE
               id = ?
         `
         const [result, fields] = await this.query(sql, [data.iban, data.title, data.id])
         return result   
      } catch (error) {
         throw error
      }
   }

   delete = async (data) => {
      try {
         const sql = `
            DELETE FROM
               accounts
            WHERE
               id = ?
         `
         const [result, fields] = await this.query(sql, [data])
         return result
      } catch (error) {
         throw error
      }
   }

   asignUser = async (user: number, account: number) => {
      try {
         const obj = {
            account: account,
            user: user
         }
         const sql = `
            INSERT INTO
               accounts_users_relations
            SET 
               ?
         `
         const [result, field] = await this.query(sql, obj)
         return result
      } catch (error) {
         throw error
      }
   }
}

export default Accounts