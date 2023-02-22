import {Sequelize} from "sequelize";
import db_password from "../config.js";

export const sequelize = new Sequelize("weather_history_db", "root", db_password, { // creates a new Sequelize instance, passes connection parameters to Sequelize constructor
    dialect: "mysql",
    host: "localhost",
});

