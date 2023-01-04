export type Weather = {
  current: {
    temp: number;
    sunrise: number;
    sunset: number;
    wind_deg: number;
    wind_speed: number;
    feels_like: number;
    weather: {
      0: { description: string; icon: string; id: number; main: string };
    };
  };
  minutely: { dt: number; precipitation: number }[];
  hourly: { temp: number }[];
  daily?: {}[];
};

export type CityWeatherData = {
  city: string;
  weather: Weather;
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
  url?: string;
  quote: Quote;
};

export type RedisURL = [uid: string, urls: { thumb: string; full: string }];
