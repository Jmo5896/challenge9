import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    // console.log('weather data post route: ', req.body);
    const city = req.body.cityName;
    // TODO: GET weather data from city name
    const data = await WeatherService.getWeatherForCity(city)
    // TODO: save city to search history
    await HistoryService.addCity(city)

    res.status(200).json(data)
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const data = await HistoryService.getCities();

    res.status(200).json(data)
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {

  try {
    await HistoryService.removeCity(req.params.id)
    res.status(200).json('delete History route')
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
});

export default router;
