import Router from "express";
import { getCityWeather, addCityWeather, getCityWeatherById } from "../controllers/weatherController.js";

const router = Router();

router.get('/', getCityWeather);

router.post('/newweather', addCityWeather);

router.get('/:cityId', getCityWeatherById);

export default router;