import { Sequelize } from "sequelize-typescript"
import { Luggage, Item, Role, Trip, User, UserTrip } from "@models"

// No prod for now so we don't care if secrets are hard coded.
const dbConfig = {
  HOST: "db",
  USER: process.env["DB_USER"] || "master",
  PASSWORD: process.env["DB_PASSWORD"] || "root",
  DB: process.env["DB_NAME"] || "vacation_organizer",
}

export const db = new Sequelize({
  host: dbConfig.HOST,
  port: 5432,
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,

  dialect: "postgres",

  models: [Trip, Luggage, User, UserTrip, Item, Role],
})
