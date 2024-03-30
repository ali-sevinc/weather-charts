import { format } from "date-fns";
import { useEffect, useState } from "react";

import { useWeatherContext } from "./context/WeatherContext";
import { ConvertedDataType, DataType } from "./helpers/types";

import Map from "./components/map/Map";

import TempHumidityLine from "./components/charts/TempHumidityLine";
import CustomAreaChart from "./components/charts/CustomAreaChart";
import CustomBarChart from "./components/charts/CustomBarChart";
import CustomLineChart from "./components/charts/CustomLineChart";

import ChartModal from "./components/charts/ChartModal";
import ChartSelect from "./components/charts/ChartSelect";
import ChartError from "./components/charts/ChartError";

export default function App() {
  const [data, setData] = useState<DataType | null>(null);
  const { position, onError, chart, onReset, status, onLoading, onSuccess } =
    useWeatherContext();

  const [locationDetails, setLocationDetails] = useState({
    counry: "",
    city: "",
    display_name: "",
    country_code: "",
  });

  useEffect(
    function () {
      async function fetchWeatherTemp() {
        if (position === null) return;
        try {
          onLoading();
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${position[0]}&longitude=${position[1]}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,visibility`
          );
          const data = await res.json();
          if (!res.ok) throw new Error("an error occured.");

          const resDetails = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position[0]}&lon=${position[1]}`
          );
          if (!resDetails.ok) throw new Error("Something went wrong");
          const detailsData = await resDetails.json();

          if (detailsData.error) throw new Error(data.error);

          setData(data);
          setLocationDetails({
            city:
              detailsData.address.city ||
              detailsData.address.town ||
              detailsData.address.village ||
              detailsData.address.region ||
              detailsData.address.state,
            counry: detailsData.address.country,
            display_name: detailsData.display_name,
            country_code: detailsData.address.country_code,
          });
          onSuccess();
        } catch (error) {
          onError("Fetching weather data failed.");
        }
      }
      fetchWeatherTemp();
    },
    [position, onError, onLoading, onSuccess]
  );

  const convertedData: ConvertedDataType[] | undefined = data?.hourly.time.map(
    (t, i) => ({
      time: format(t, "MMM-dd HH:00"),
      temperature: data?.hourly.temperature_2m[i],
      relative_humidity: data?.hourly.relative_humidity_2m[i],
      wind: data?.hourly.wind_speed_10m[i],
      precipitation: data?.hourly.precipitation[i],
      visibility: data?.hourly.visibility[i],
    })
  );

  return (
    <div>
      <Map />
      <ChartModal open={position !== null} onClose={onReset}>
        {status === "loading" && (
          <h2 className="text-center text-2xl font-semibold py-2">
            Loading...
          </h2>
        )}
        {status === "error" && <ChartError />}
        {data && status === "idle" && (
          <>
            {locationDetails.counry && (
              <div className="text-center py-4 px-4 sm:px-10 space-y-4">
                <h2 className="text-base sm:text-xl font-semibold">
                  {locationDetails.display_name}
                </h2>
                <ChartSelect />
              </div>
            )}
            {chart === "temperature" && (
              <CustomAreaChart
                data={convertedData}
                unit={data.hourly_units.temperature_2m}
                dataKey="temperature"
                stroke="#ea580c"
                fill="#fb923c"
                name="Temperature"
                header="Temperature Area Chart"
              />
            )}

            {chart === "relativeHumidity" && (
              <CustomAreaChart
                data={convertedData}
                unit={data.hourly_units.relative_humidity_2m}
                dataKey="relative_humidity"
                stroke="#4b5563"
                fill="#a1a1aa"
                name="Relative Humidity"
                header="Relative Humidity Area Chart"
              />
            )}

            {chart === "tempHumidityLine" && (
              <TempHumidityLine
                data={convertedData}
                tempUnit={data.hourly_units.temperature_2m}
                humUnit={data.hourly_units.relative_humidity_2m}
              />
            )}

            {chart === "wind" && (
              <CustomAreaChart
                data={convertedData}
                dataKey="wind"
                stroke="#0284c7"
                fill="#38bdf8"
                name="Wind"
                unit={data.hourly_units.wind_speed_10m}
                header="Wind Speed Area Chart"
              />
            )}

            {chart === "precipitation" && (
              <CustomBarChart
                data={convertedData}
                unit={data.hourly_units.precipitation}
                dataKey="precipitation"
                stroke="#0284c7"
                fill="#38bdf8"
                name="Precipitation"
                header="Precipitation Bar Chart"
              />
            )}

            {chart === "visibility" && (
              <CustomLineChart
                data={convertedData}
                unit={data.hourly_units.visibility}
                dataKey="visibility"
                stroke="#4b5563"
                name="Visibility"
                header="Visibility Range Line Chart"
              />
            )}
          </>
        )}
      </ChartModal>
    </div>
  );
}
