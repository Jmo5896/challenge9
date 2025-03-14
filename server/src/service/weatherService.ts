import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
// { city, date, icon, iconDescription, tempF, windSpeed, humidity } 
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;
  constructor(city: string,
    date: string,
    icon: string,
    iconDescription: string,
    tempF: number,
    windSpeed: number,
    humidity: number) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  private city: string;
  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.city = ''
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.city}&appid=${this.apiKey}`
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const response = await fetch(query);
    const cleanResponse = await response.json();
    return cleanResponse[0];
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    // console.log("destructureLocationData: ", locationData);

    return {
      lat: locationData.lat,
      lon: locationData.lon
    }
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const query = this.buildGeocodeQuery();
    const fetchedData = await this.fetchLocationData(query);
    return this.destructureLocationData(fetchedData)
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coords: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${this.apiKey}&units=metric`
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coords: Coordinates) {
    // const coords = await this.fetchAndDestructureLocationData();
    const query = this.buildWeatherQuery(coords);
    // console.log(query);

    const fetchData = await fetch(query);
    return fetchData.json();
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(res: any) {
    // const res = response.list[0];
    return new Weather(
      this.city,
      res.dt_txt,
      res.weather[0].icon,
      res.weather[0].description,
      res.main.temp,
      res.wind.speed,
      res.main.humidity
    )
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(weatherData: any[]) {
    // console.log('buildForecastArray: ', weatherData);

    const filterTime = '12:00:00'
    const forecast = weatherData.filter(obj => obj.dt_txt.split(' ')[1] === filterTime)
    return forecast.map(obj => this.parseCurrentWeather(obj))
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    // console.log('getWeatherForCity');
    this.city = city;
    const coords = await this.fetchAndDestructureLocationData()
    const resWeather = await this.fetchWeatherData(coords)
    const weatherData = this.buildForecastArray(resWeather.list);
    // console.log(weatherData);

    return weatherData

  }
}

export default new WeatherService();
