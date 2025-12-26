import { Sequelize } from 'sequelize'
import mysql2 from 'mysql2'
import { IWestgatedb } from '../types/config'
import dotenv from 'dotenv'

dotenv.config();

const config: IWestgatedb = {
  env: 'development',
  jwtSecret: process.env.JWT_SECRET ?? '',
  jwtExpiresIn: process.env.JWT_EXPIRY ?? '',
  port: Number(process.env.PORT) ?? 4040,
  db: {
    username: process.env.DB_SANDBOX_USERNAME ?? '',
    password: process.env.DB_SANDBOX_PASSWORD ?? '',
    dbName: process.env.DB_SANDBOX_NAME ?? '',
    details: {
      host: process.env.DB_SANDBOX_HOST ?? '',
      dialect: 'mysql',
      dialectModule: mysql2,
      pool: {
        max: 5,
        min: 0,
        idle: 100000,
        acquire: 300000
      },
      dialectOptions: {
        connectTimeout: 600000
      }
    }
  },
}

const sequelize = new Sequelize(
  config.db.dbName,
  config.db.username,
  config.db.password,
  config.db.details,
)

export default sequelize
