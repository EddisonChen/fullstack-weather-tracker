import Router from "express";
import { getCityWeather, addCityWeather, getCityWeatherById } from "../controllers/weatherController.js";

const router = Router(); // different endpoints and the functions associated with them

router.get('/', getCityWeather);

router.post('/newweather', addCityWeather);

router.get('/:cityId', getCityWeatherById);

export default router;