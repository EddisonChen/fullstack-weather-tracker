import {Sequelize} from "sequelize";
import {sequelize} from "../db/index.js";

export const CityWeather = sequelize.define("cityWeathers", { // defines attributes (name of table, columns, data types) about the model, which represents a table in the DB
    cityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
    },
    nameCity: {
        type: Sequelize.STRING
    },
    nameCountry: {
        type: Sequelize.STRING
    },
    weatherMain: {
        type: Sequelize.STRING
    },
    weatherDescription: {
        type: Sequelize.STRING
    },
    tempMain: {
        type: Sequelize.FLOAT
    },
    tempHigh: {
        type: Sequelize.FLOAT
    },
    tempLow: {
        type: Sequelize.FLOAT
    },
    tempFeelsLike: {
        type: Sequelize.FLOAT
    },
    humidity: {
        type: Sequelize.FLOAT
    },
    visibility: {
        type: Sequelize.FLOAT
    },
    windDirection: {
        type: Sequelize.STRING
    },
    windSpeed: {
        type: Sequelize.FLOAT
    },
    windGustSpeed: {
        type: Sequelize.FLOAT
    }
});