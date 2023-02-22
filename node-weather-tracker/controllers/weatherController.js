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
        cityId: req.body.cityId,
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
        windSpeed: req.body.windSpeed
    }) .then(() => {
        res.status(201).send({message: "weather added"})
    }) .catch((err => {
        console.log(err)
    }))
}

export const getCityWeatherById = (req, res) => {
    const cityId = parseInt(req.params.cityId);
    CityWeather.findOne({
        where: {
            cityId: cityId, 
        },
        order: [['id', 'DESC']]
    })
    .then(cityWeathers => {
        res.status(200).send(cityWeathers)
    }) .catch(err => {
        console.log(err)
    })
}