export type Weather = {
  [key: string]: any,
  main: {
    temp: number,
    feels_like: number,
    humidity: number,
    pressure: number,
    temp_max: number,
    temp_min: number,
  },
  sys: {
    country: string;
  },
  name: string;
  wind: {
    speed: number,
  },
  weather: { 
    id: number,
    main: string,
    description: string,
    icon: string, 
  }[];
};