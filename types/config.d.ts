import { Dialect } from 'sequelize'
import { Request } from 'express'

interface IDbconfig {
  username: string
  password: string
  dbName: string
  details: {
    host: string
    dialect?: Dialect
    dialectModule: mysql2
    pool: {
      max: number
      min: number
      idle: number
      acquire: number
    }
    dialectOptions: {
      connectTimeout: number
    }
  }
}


interface IWestgatedb {
  env: string
  jwtSecret: string
  jwtExpiresIn: string
  port: number
  db: IDbconfig
}

interface CustomRequest extends Request {
  tekoaToken?: {
    Status: string,
    UserToken: string
  }
}