import * as sql from 'mysql2/promise'

const pool = sql.createPool({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_DATABASE,
   waitForConnections: process.env.DB_WAIT_CONN,
   connectionLimit: process.env.DB_CONN_LIMIT,
   queueLimit: process.env.DB_QUEUE_LIMIT
})


class DatabaseManager { 
   public conn: any
   constructor() {
      this.conn = null
   }

   initDB = async () => {
      this.conn = await pool.getConnection()
   }

    checkDB = async() => {
      if (this.conn === null) {
         await this.initDB()
      }
   }

    query = async(sql, values) => {
      try {
         await this.checkDB()
         const data = await this.conn.query(sql, values)
         await this.conn.release()
         return data 
      } catch (error) {
         throw error
      }
   }
   

}

export default DatabaseManager