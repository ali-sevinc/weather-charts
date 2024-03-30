import { ChangeEvent } from "react";
import { useWeatherContext } from "../../context/WeatherContext";
type Chart =
  | "temperature"
  | "relativeHumidity"
  | "wind"
  | "precipitation"
  | "tempHumidityLine"
  | "visibility";

export default function ChartSelect() {
  const { onChangeChart } = useWeatherContext();

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    onChangeChart(event.target.value as Chart);
  }

  return (
    <div className="flex items-center gap-2 justify-center text-sm sm:text-xl ">
      <label htmlFor="chart-select" className="shadow px-2 py-1 rounded">
        Select Chart
      </label>
      <select
        id="chart-select"
        onChange={handleChange}
        className="px-2 py-1 rounded shadow"
      >
        <option value="temperature">Temperature</option>
        <option value="relativeHumidity">Relative Humidity</option>
        <option value="wind">Wind Speed</option>
        <option value="precipitation">Precipitation</option>
        <option value="tempHumidityLine">Temerature-Humidity</option>
        <option value="visibility">Visibility</option>
      </select>
    </div>
  );
}
