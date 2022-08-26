import {Sequelize} from "sequelize";

export const sequelize = new Sequelize("weather_history_db", "root", "ppbreath!", {
    dialect: "mysql",
    host: "localhost",
});