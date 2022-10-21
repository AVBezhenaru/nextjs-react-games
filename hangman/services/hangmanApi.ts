import axios from 'axios';

export class AppApi {
  private BASE_URL = 'http://localhost:3000/api/hangman';

  public getRandomWord = async () => axios.get(`${this.BASE_URL}/words`);

  public getThemeWord = async (theme: string) => axios.get(`${this.BASE_URL}/words/${theme}`);

  public getThemes = () => axios.get(`${this.BASE_URL}/themes`);
}

export const appApi = new AppApi();
