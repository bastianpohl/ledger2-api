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
         waitForConnections: true,
         connectionLimit: 10,
         queueLimit: 300
      })
   }

    checkDB = async() => {
      if (this.conn === null) {
         await this.initDB()
      }
   }

    query = async(sql, values?) => {
      try {
         return await this.conn.query(sql, values)
      } catch (error) {
         throw error
      }
   }
   
    close = async() => {
      this.conn.close()
   }
}

export default DatabaseManager