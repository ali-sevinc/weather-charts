export type DataType = {
  hourly: {
    relative_humidity_2m: number[];
    temperature_2m: number[];
    time: string[];
    wind_speed_10m: number[];
    precipitation: number[];
    visibility: number[];
  };
  hourly_units: {
    relative_humidity_2m: string;
    temperature_2m: string;
    time: string;
    wind_speed_10m: string;
    precipitation: string;
    visibility: string;
  };
  latitude: number;
  longitude: number;
};

export type ChartPropsType = {
  data: ConvertedDataType[] | undefined;
  unit: string;
};
export type ConvertedDataType = {
  time: string;
  temperature: number;
  relative_humidity: number;
  wind: number;
  precipitation: number;
  visibility: number;
};
