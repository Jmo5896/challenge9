import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    console.log('weather data post route: ', req.body);

    // TODO: GET weather data from city name

    // TODO: save city to search history
    // await HistoryService.addCity('London')

    res.status(200).json([])
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
router.delete('/history/:id', async (_req: Request, res: Response) => {

  try {
    res.status(200).json('delete History route')
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
});

export default router;
