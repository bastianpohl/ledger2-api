import * as sql from 'mysql2/promise'

class DatabaseManager { 
   private host: any
   private user: any
   private pass: any
   private db: any
   public conn: any
   constructor() {
      this.host = process.env.DB_HOST 
      this.user = process.env.DB_USER
      this.pass = process.env.DB_PASS
      this.db   = process.env.DB_DATABASE
      this.conn = null
   }

   initDB = async () => {
      this.conn = await sql.createPool({
         host: this.host,
         user: this.user,
         password: this.pass,
         database: this.db,
         waitForConnections: process.env.DB_WAIT_CONN,
         connectionLimit: process.env.DB_CONN_LIMIT,
         queueLimit: process.env.DB_QUEUE_LIMIT
      })
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
         return data 
      } catch (error) {
         throw error
      }
   }
   

}

export default DatabaseManager