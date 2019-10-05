import { Time } from "../time";

export class MyStorage {
  public timeLine: Time[];
  public config: { [key: string]: Time };

  constructor() {
    this.timeLine = this.getTimeLineFromCache() || [];
    this.config = this.getConfigFromCache() || {};
  }

  private getCache = () => localStorage.getItem("cache");

  public set = (key: string, value?: any) => {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  };

  public getTimeLine = () => this.timeLine;

  public getTimeLineFromCache = (): Time[] | undefined => {
    try {
      let cachedData = this.getCache();

      if (cachedData) {
        let t = JSON.parse(cachedData);

        return t.timeLine.map(
          (time: Time) => new Time(time.minutes, time.seconds, time.name)
        );
      }
    } catch (e) {}
  };

  public getConfigFromCache = (): { [key: string]: Time } | undefined => {
    try {
      let cachedData = localStorage.getItem("cache");

      if (cachedData) {
        let t = JSON.parse(cachedData);

        return t.config;
      }
    } catch (e) {}
  };
}
