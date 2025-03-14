import { v4 as uuidv4 } from 'uuid';
import fs from 'node:fs/promises';

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    const response = await fs.readFile('db/searchHistory.json', 'utf8');
    return JSON.parse(response)
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    return await fs.writeFile('db/searchHistory.json', JSON.stringify(cities))
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    const data = await this.read();
    // console.log('getCities: ', data);

    return data;
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    // console.log("addCity: ", city);
    const currentCities = await this.getCities();
    const existingCity = currentCities.find(obj => obj.name.toLocaleLowerCase() === city.toLocaleLowerCase())
    if (!existingCity) {
      const newCity = new City(city, uuidv4())
      currentCities.push(newCity);
      await this.write(currentCities);
    }
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    const currentCities = await this.getCities();
    const newList = currentCities.filter(obj => obj.id !== id);
    await this.write(newList)
  }
}

export default new HistoryService();
