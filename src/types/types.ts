export type Weather = {
  [key: string]: any,
  main: {
    temp: number;
  },
  sys: {
    country: string;
  },
  name: string;
  weather: { 
    id: number,
    main: string,
    description: string,
    icon: string, 
  }[];
};