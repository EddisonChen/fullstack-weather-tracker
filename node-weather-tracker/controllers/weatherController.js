import { CityWeather } from "../models/weatherHistoryModel.js";

export const getCityWeather = (req, res) => {
    CityWeather.findAll()
    .then((cityWeathers) => {
        res.status(200).send(cityWeathers)
    }) .catch((err) => {
        console.log(err)
    })
}

export const addCityWeather = (req, res) => {
    CityWeather.create({
        id: req.body.id,
        nameCity: req.body.nameCity,
        nameCountry: req.body.nameCountry,
        weatherMain: req.body.weatherMain,
        weatherDescription: req.body.weatherDescription,
        tempMain: req.body.tempMain,
        tempHigh: req.body.tempHigh,
        tempLow: req.body.tempLow,
        tempFeelsLike: req.body.tempFeelsLike,
        humidity: req.body.humidity,
        visibility: req.body.visibility,
        windDirection: req.body.windDirection,
        windSpeed: req.body.windSpeed,
        windGustSpeed: req.body.windGustSpeed
    }) .then(() => {
        res.status(201).send({message: "weather added"})
    }) .catch((err => {
        console.log(err)
    }))
}

export const getCityWeatherById = (req, res) => {
    const id = parseInt(req.params.id);
    CityWeather.findByPk(id)
    .then(cityWeathers => {
        res.status(200).send(cityWeathers)
    }) .catch(err => {
        console.log(err)
    })
}