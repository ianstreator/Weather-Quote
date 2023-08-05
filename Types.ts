export type CityWeatherData = {
  city: string;
  weather: Weather;
};

export type Weather = {
  current: {
    temp: number;
    sunrise: number;
    sunset: number;
    wind_deg: number;
    wind_speed: number;
    feels_like: number;
    dt: number;
    weather: {
      0: { description: string; icon: string; id: number; main: string };
    };
  };
  minutely?: { dt: number; precipitation: number }[];
  hourly: Hourly[];
  daily: Daily[];
};

export type Hourly = {
  pop: number;
  dt: number;
};

export type Daily = {
  humidity: number;
  sunrise: number;
  sunset: number;
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
  };
  weather: {
    0: { description: string; icon: string; id: number; main: string };
  };
  pop: number;
  snow?: number;
  rain?: number;
  wind_deg: number;
  wind_speed: number;
};

export type Coords = {
  lat: number;
  lon: number;
};

export type Error = {
  message: any;
};

export type Unsplash = {
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
};

export type Quote = {
  quote: string;
  author: string;
};

export type ServerSideAssets = {
  url: string;
  quote: Quote;
};

export type URLs = [uid: string, urls: { thumb: string; full: string }];
