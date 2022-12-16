export type Weather = {
  current: {
    temp: number;
    sunrise: number;
    sunset: number;
    wind_deg: number;
    wind_speed: number;
    weather: {
      0: { description: string; icon: string; id: number; main: string };
    };
  };
  daily: {}[];
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
    thumn: string;
  };
};

export type ServerSideAssets = {
  url: string;
  quote: { quote: string; author: string };
};
