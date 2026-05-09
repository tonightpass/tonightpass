import type { Endpoint } from "../../endpoints";

export type WeatherForecast = {
  date: string;
  tempMin: number;
  tempMax: number;
  conditionText: string;
  conditionIcon: string;
  conditionCode: number;
  chanceOfRain: number;
  windKph: number;
};

export type WeatherEndpoints = Endpoint<
  "GET",
  "/weather/forecast",
  WeatherForecast | null
>;
